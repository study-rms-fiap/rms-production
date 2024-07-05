import { Inject, Injectable } from "@nestjs/common";
import { Step } from "./step";
import { Order } from "src/domain/order/order.entity";
import { IOrderRepository } from "src/application/ports/order.repository.port";
import { OrderStatus } from "src/domain/value-objects/order-status";

@Injectable()
export class PrepareOrder extends Step<Order, void> {
  constructor(
    @Inject('order-repository')
    private orderRepository: IOrderRepository,
  ) {
    super();
    this.name = 'Prepare Order Step';
  }

  invoke(order: Order): Promise<void> {
    order.updateStatus(OrderStatus.PREPARING);
    this.orderRepository.update(order);
    return Promise.resolve();
  }

  withCompensation(order: Order): Promise<void> {
    /* To undo this step , we need to cancel the order */
    order.cancel();
    this.orderRepository.update(order);
    return Promise.resolve();
  }
}