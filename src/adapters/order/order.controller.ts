import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  constructor(private readonly orderRepository: OrderRepository, private readonly paymentRepository: PaymentRepository) { }

  @Get()
  @ApiOperation({ summary: 'List all orders' })
  findAllOrders() {
    return FindAllOrdersUseCase.run(this.orderRepository);
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new order' })
  async createOrder(@Body() order: CreateOrderDto) {
    const createdOrder = CreateOrderUseCase.run(this.orderRepository, this.paymentRepository, order);
    return createdOrder;
  }

  @Post('status')
  @ApiOperation({ summary: 'Updates the order status' })
  async updateOrderStatus(@Body() status: UpdateOrderStatusDto) {
    return UpdateOrderStatusUseCase.run(this.orderRepository, status);
  }

}


