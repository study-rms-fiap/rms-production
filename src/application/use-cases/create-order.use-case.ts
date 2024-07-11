import { IOrder, Order } from 'src/domain/order/order.entity';
import { IOrderRepository } from '../ports/order.repository.port';
import { CreateOrderDto } from 'src/adapters/order/dto/create-order.dto';
import { IOrderItem, OrderItem } from 'src/domain/order/order-item.entity';
import { IPaymentRepository } from '../ports/payment.repository.port';

export class CreateOrderUseCase {
  static async run(repo: IOrderRepository, paymentRepo: IPaymentRepository, orderDto: CreateOrderDto) {
    const orderItems: Array<IOrderItem> = orderDto.items.map(
      (item) => new OrderItem(item.id, item.name),
    );

    const order: IOrder = new Order(
      orderDto.client,
      orderDto.amount,
      orderItems,
    );

    const savedOrder = await repo.save(order)

    await paymentRepo
      .createNewPaymentForOrder(
        { orderId: savedOrder.id, client: savedOrder.client, amount: savedOrder.amount }
      )

    return savedOrder;
  }
}
