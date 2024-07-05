import { Inject, Injectable } from "@nestjs/common";
import { Step } from "./steps/step";
import { Order } from "src/domain/order/order.entity";
import { CreateOrderStep } from "./steps/create-order.saga.step";

@Injectable()
export class CreateOrderSaga {
  private steps: Step<Order, void>[] = [];

  /* To keep track of the already successful steps, we will need this information to undo them in case of an error. */
  private successfulSteps: Step<Order, void>[] = [];

//   constructor(
//     /*
//       We introduce the steps that compose this Saga.
//     */
//     @Inject('place-order-step') step1: CreateOrderStep,
//     @Inject('check-products-availibity') step2: CheckProductsAvailibityStep,
//     @Inject('authorize-payment') step3: AuthorizePaymentStep,
//     @Inject('confirm-order') step4: ConfirmOrderStep,
//     @Inject('update-stock') step5: UpdateStockStep,
//   ) {
//     this.steps = [step1, step2, step3, step4, step5];
//   }

  async execute(order: Order) {
    /* We loop through each step */
    for (let step of this.steps) {
      try {
        console.info(`Invoking: ${step.name} ...`);
        /* We Invoke each step */
        await step.invoke(order);  
        /* and keep track of each succeful step */
        this.successfulSteps.unshift(step);
      } catch (error) {
        console.error(`Failed Step: ${step.name} !!`);
        /* If an error has occurred, undo the previous successful steps. */
        this.successfulSteps.forEach(async (s) => {
          console.info(`Rollbacking: ${s.name} ...`);
          await s.withCompensation(order);
        });
        throw error;
      }
    }
    console.info('Order Creation Transaction ended successfuly');
  }
}