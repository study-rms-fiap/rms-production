import { IOrder, Order } from 'src/domain/order/order.entity';

export interface IOrderRepository {
  findAll(): Promise<Array<IOrder>>;
  findByStatus(status: string): Promise<Array<IOrder>>;
  save(order: Order): Promise<IOrder>;
  update(order: Order): Promise<IOrder>;
}
