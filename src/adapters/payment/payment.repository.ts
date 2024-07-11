import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka, Payload } from "@nestjs/microservices";
import { IPaymentRepository } from "src/application/ports/payment.repository.port";

@Injectable()
export class PaymentRepository implements IPaymentRepository, OnModuleInit{
    constructor(
        @Inject('PRODUCTION_API')
         private readonly kafka: ClientKafka
    ){}

    listenPayments(@Payload()message: any){
        console.log('listening payments RMS PRODCTION', message)
    }

    createNewPaymentForOrder(input: any) {
        return this.kafka.emit('new_orders', input)
    }

    onModuleInit() {
    }
}