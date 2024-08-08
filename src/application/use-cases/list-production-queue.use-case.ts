import { OrderStatus } from "src/domain/value-objects/order-status";
import { IOrderRepository } from "../ports/order.repository.port";

export class ListProductionQueueUseCase {
    static async run(repo: IOrderRepository) {
        return await repo.findByStatus(OrderStatus.IN_QUEUE)
    }
}