import { InjectRepository } from '@nestjs/typeorm';
import { IOrderRepository } from 'src/application/ports/order.repository.port';
import { IOrder, Order } from 'src/domain/order/order.entity';
import { OrderStatus } from 'src/domain/value-objects/order-status';
import { Not, Repository } from 'typeorm';

export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  async findAll(): Promise<IOrder[]> {
    const listOrders = await this.repo.find({
      order: { status: 'DESC', createdAt: 'ASC' },
      where: { status: Not(OrderStatus.COMPLETED) },
    });

    return listOrders;
  }

  async findByStatus(status: OrderStatus): Promise<IOrder[]> {
    return await this.repo.find({
      order: { status: 'DESC', createdAt: 'ASC' },
      where: { status: status },
    });
  }

  async findById(id: string): Promise<IOrder> {
    return await this.repo.findOne({ where: { id: id } });
  }

  save(order: Order): Promise<IOrder> {
    return this.repo.save(order);
  }

  async update(order: Order): Promise<any> {
    return await this.repo.update(order.id, order);
  }
}
