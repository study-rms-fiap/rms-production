import { Inject, Injectable } from '@nestjs/common';
import { Step } from './step';
import { IOrderRepository } from 'src/application/ports/order.repository.port';
import { Order } from 'src/domain/order/order.entity';

// nao vai fazer sentido. O pedido vai ser criado sem saga.
@Injectable()
export class CreateOrderStep extends Step<Order, void> {
  constructor(
    @Inject('order-repository')
    private orderRepository: IOrderRepository,
  ) {
    super();
    this.name = 'Create Order Step';
  }

  invoke(order: Order): Promise<void> {
    this.orderRepository.save(order);
    return Promise.resolve();
  }

  withCompensation(order: Order): Promise<void> {
    order.cancel();
    this.orderRepository.update(order);
    return Promise.resolve();
  }
}