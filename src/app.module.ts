import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Order } from './domain/order/order.entity';
import { OrderItem } from './domain/order/order-item.entity';
import { OrderRepository } from './adapters/order/order.repository';
import { OrderController } from './adapters/order/order.controller';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentController } from './adapters/payment/payment.controller';
import { PaymentRepository } from './adapters/payment/payment.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'PRODUCTION_API',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'production',
            brokers: ['broker:9092'],
          },
          consumer: {
            groupId: 'production-consumer',
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: config().parsed['DB_HOST'] || process.env.DB_HOST,
      port: Number(config().parsed['DB_PORT'] || process.env.DB_PORT),
      username: config().parsed['DB_USER'] || process.env.DB_USER,
      password: config().parsed['DB_PASSWORD'] || process.env.DB_PASSWORD,
      database: config().parsed['DB_DATABASE'] || process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
  controllers: [OrderController, PaymentController],
  providers: [OrderRepository, PaymentRepository],
})
export class AppModule {
  
  constructor(@Inject('PRODUCTION_API')
  private readonly kafka: ClientKafka) {
    console.log('PRODUCTION DB HOST ', config().parsed['DB_HOST'] || process.env.DB_HOST);
    console.log(
      'PRODUCTION DB_PORT',
      Number(config().parsed['DB_PORT'] || process.env.DB_PORT),
    );
    console.log(
      'PRODUCTION APP PORT',
      Number(config().parsed['PORT'] || process.env.PORT),
    );
  }

   onModuleInit() {
        this.kafka.subscribeToResponseOf('process_payment')
    }
}
