import { IOrder, Order } from 'src/domain/order/order.entity';
import { OrderStatus } from 'src/domain/value-objects/order-status';

export interface IOrderRepository {
  findAll(): Promise<Array<IOrder>>;
  findById(id: string): Promise<IOrder>;
  findByStatus(status: OrderStatus): Promise<Array<IOrder>>;
  save(order: Order): Promise<IOrder>;
  update(order: Order): Promise<IOrder>;
}
