import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";

@Injectable()
export class PaymentRepository implements OnModuleInit{
    constructor(
        @Inject('PRODUCTION_API') private readonly kafka: ClientKafka
    ){}

    listenPayments(@Payload()message: any){
        console.log('listening payments RMS PRODCTION', message)

    }

    onModuleInit() {
        console.log('subs')
        this.kafka.subscribeToResponseOf('process_payment')
    }
}