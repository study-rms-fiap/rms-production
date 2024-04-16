import { IOrder } from 'src/domain/order/order.entity';
import { IOrderRepository } from '../ports/order.repository.port';

export class FindOrderByIdUseCase {
  static run(repo: IOrderRepository, orderId: string): Promise<IOrder> {
    return repo.findById(orderId);
  }
}
