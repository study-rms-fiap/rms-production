import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderUseCase } from 'src/application/use-cases/create-order.use-case';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateOrderStatusUseCase } from 'src/application/use-cases/update-order-status.use-case';
import { FindAllOrdersUseCase } from 'src/application/use-cases/find-all-orders.use-case';
import { PaymentRepository } from '../payment/payment.repository';

@ApiTags('Orders')
@Controller('/orders')
export class OrderController {
  constructor(private readonly orderRepository: OrderRepository, private readonly paymentRepository: PaymentRepository) {}

  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    const createdOrder = CreateOrderUseCase.run(this.orderRepository, this.paymentRepository, order);
    return createdOrder;
  }

  @Post('status')
  async updateOrderStatus(@Body() status: UpdateOrderStatusDto) {
    return UpdateOrderStatusUseCase.run(this.orderRepository, status);
  }

  @Get()
  findAllOrders() {
    return FindAllOrdersUseCase.run(this.orderRepository);
  }
}


