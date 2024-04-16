import { IOrder, Order } from 'src/domain/order/order.entity';
import { IOrderRepository } from '../ports/order.repository.port';
import { CreateOrderDto } from 'src/adapters/order/dto/create-order.dto';
import { IOrderItem, OrderItem } from 'src/domain/order/order-item.entity';

export class CreateOrderUseCase {
  static run(repo: IOrderRepository, orderDto: CreateOrderDto) {
    const listOrderItems: Array<IOrderItem> = orderDto.items.map(
      (item) => new OrderItem(item.product, item.quantity),
    );
    const order: IOrder = new Order(
      orderDto.orderRef,
      orderDto.client,
      listOrderItems,
    );
    return repo.save(order);
  }
}
