import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Order } from './domain/order/order.entity';
import { OrderItem } from './domain/order/order-item.entity';
import { OrderRepository } from './adapters/order/order.repository';
import { OrderController } from './adapters/order/order.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: config().parsed['DB_HOST'],
      port: Number(config().parsed['DB_PORT']),
      username: config().parsed['DB_USER'],
      password: config().parsed['DB_PASSWORD'],
      database: config().parsed['DB_DATABASE'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
  controllers: [OrderController],
  providers: [OrderRepository],
})
export class AppModule {}
