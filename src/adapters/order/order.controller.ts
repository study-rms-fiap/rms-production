import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderUseCase } from 'src/application/use-cases/create-order.use-case';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateOrderStatusUseCase } from 'src/application/use-cases/update-order-status.use-case';
import { FindAllOrdersUseCase } from 'src/application/use-cases/find-all-orders.use-case';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { orderPaymentDto } from './dto/order-paid.dto';

@ApiTags('Orders')
@Controller()
export class OrderController {
  constructor(private readonly orderRepository: OrderRepository) {}

  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    const createdOrder = CreateOrderUseCase.run(this.orderRepository, order);
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

  @MessagePattern('paymentservice')
  orderPaid(@Payload()message: orderPaymentDto){
    console.info( 'Production Service: paymentd', message)
  }

  @MessagePattern('paymentservicereply')
  orderPaymentFailure(@Payload()message: orderPaymentDto) {
    console.info( 'Production Service: payment reply', message)
  }

  @EventPattern('paymentservice')
  paymentAuthorize(@Payload()data: any){
    console.info('ORDER PAY - EVENT PATTERN', data)
  }
}


