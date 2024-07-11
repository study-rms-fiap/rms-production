import { Controller, Inject, OnModuleInit, Post } from "@nestjs/common";
import { ClientKafka, EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { OrderPaymentDto } from "./dto/order-payment.dto";
import { PaymentRepository } from "./payment.repository";

@ApiTags('Payment')
@Controller()
export class PaymentController implements OnModuleInit {

    constructor(
        private payment: PaymentRepository,
    ) { }

    // vai engatilhar quando recebermos o pagamento
    @EventPattern('process_payment')
    async listePayments(@Payload() message: OrderPaymentDto) {
        console.log('PRODUCTION - process_payment', message)
    }


    onModuleInit() {
    }
}