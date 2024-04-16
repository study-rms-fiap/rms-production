import { UpdateOrderStatusDto } from 'src/adapters/order/dto/update-order-status.dto';
import { IOrderRepository } from '../ports/order.repository.port';
import { OrderStatus } from 'src/domain/value-objects/order-status';
import { DateTime } from 'luxon';
import { FindOrderByIdUseCase } from './find-order-by-id.use-case';
import { BadRequestException } from '@nestjs/common';

export class UpdateOrderStatusUseCase {
  static async run(repo: IOrderRepository, order: UpdateOrderStatusDto) {
    const foundOrder = await FindOrderByIdUseCase.run(repo, order.id);

    if (foundOrder === undefined) {
      throw new BadRequestException('Order id does not exist');
    }

    const status = Object.keys(OrderStatus).find(
      (key) => String(key) === String(order.status),
    );

    if (status === undefined) {
      throw new BadRequestException('Invalid order status');
    }

    foundOrder.status = Number(status);
    foundOrder.lastUpdate = DateTime.utc().toISO();
    repo.save(foundOrder);
  }
}
