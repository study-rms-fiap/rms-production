import { Controller, OnModuleInit } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { ProcessPaymentDto } from "./dto/process-payment.dto";
import { ProcessPaymentUseCase } from "src/application/use-cases/process-payment.use-case";
import { OrderRepository } from "../order/order.repository";

@ApiTags('Payment')
@Controller()
export class PaymentController implements OnModuleInit {
    constructor(
        private orderRepository: OrderRepository
    ) { }

    @EventPattern('process_payment')
    async listePayments(@Payload() message: ProcessPaymentDto) {

        console.info('------ Queue process_payment ------', message)
        ProcessPaymentUseCase.run(this.orderRepository, message)
    }

    onModuleInit() {
    }
}