import { Controller, Post } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { OrderPaymentDto } from "./dto/order-payment.dto";
import { PaymentRepository } from "./payment.repository";

@ApiTags('Payment')
@Controller()
export class PaymentController {

    constructor(private payment: PaymentRepository){}
    
    @EventPattern('process_payment')
    async listePayments(@Payload() message: OrderPaymentDto) {
        console.log('PRODUCTION - process_payment', message)
        this.payment.listenPayments(message)
    }
}