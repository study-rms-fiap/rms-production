import { IOrderRepository } from '../ports/order.repository.port';

export class FindAllOrdersUseCase {
  static run(repo: IOrderRepository) {
    return repo.findAll();
  }
}
