import { Inject, Injectable } from "@nestjs/common";
import { Order } from "src/domain/order/order.entity";
import { Step } from "./step";
import { ClientKafka } from "@nestjs/microservices";
import msConfig from '../../../../../config'
import { lastValueFrom } from "rxjs";
import { OrderStatus } from "src/domain/value-objects/order-status";

@Injectable()
export class AuthorizePaymentStep extends Step<Order, void> {
  constructor(
    @Inject(msConfig().services.payment.name) private paymentClient: ClientKafka,
  ) {
    super();
    this.name = 'Authorize Payment Step';
  }

  async invoke(order: Order): Promise<any> {
    const paymnetAuthorization = await lastValueFrom(
    /* Call the payment service ( through kafka ) to authorize payment */
      this.paymentClient.send('payment.payment.authorize', {
        ...order
      }),
    );

    if (!paymnetAuthorization.authorized) {
     /* If the payment is not authorized than throw an error */
      throw new Error('The payment unsuccessful');
    }
  }

  async withCompensation(order: Order): Promise<any> {
   /*To compensate this step , we need to trigger the refund */
    await lastValueFrom(
      this.paymentClient.send('payment.payment.error', {
        ...order,
        status: OrderStatus.WAITING_PAYMENT
      }),
    );
  }

  async onModuleInit() {
    /* We subscribe for both calls responses to be able to receive the reponses*/
    console.log('Kakfa starts to listem')
    this.paymentClient.subscribeToResponseOf('payment.payment.authorize');
    this.paymentClient.subscribeToResponseOf('payment.payment.error');

    await this.paymentClient.connect();
  }
}