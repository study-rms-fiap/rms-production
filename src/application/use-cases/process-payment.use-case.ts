import { ProcessPaymentDto } from "src/adapters/payment/dto/process-payment.dto";
import { IOrderRepository } from "../ports/order.repository.port";
import { OrderStatus } from "src/domain/value-objects/order-status";
import { UpdateOrderStatusUseCase } from "./update-order-status.use-case";
import { UpdateOrderStatusDto } from "src/adapters/order/dto/update-order-status.dto";

export class ProcessPaymentUseCase {
    static run(repo: IOrderRepository, data: ProcessPaymentDto) {
        const status = ProcessPaymentUseCase.convertStatus(data.status)

        const orderStatusDto: UpdateOrderStatusDto = {
            id: data.paymentId,
            status: String(status)
        }

        console.info('Atualizando Pedido', orderStatusDto)
        console.info('Status no banco será', OrderStatus[status])
        UpdateOrderStatusUseCase.run(repo, orderStatusDto)
    }

    private static convertStatus(status: number) {
        switch (status) {
            case 10:
                return OrderStatus.IN_QUEUE

            case 1:
                return OrderStatus.WAITING_PAYMENT

            default:
                return OrderStatus.CANCELLED
        }
    }
}