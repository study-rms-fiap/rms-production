import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTime } from 'luxon';
import { IOrderItem, OrderItem } from './order-item.entity';
import { OrderStatus } from '../value-objects/order-status';
export interface IOrder {
  id: string;
  client: string;
  amount: number;
  createdAt: string;
  lastUpdate: string;
  status: OrderStatus;
  items: Array<IOrderItem>;
  updateStatus(status: OrderStatus): void;
  cancel(): void;
  confirm(): void;
}

@Entity()
export class Order implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  client: string;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @CreateDateColumn({ type: 'datetime', generated: true, nullable: false })
  createdAt: string;

  @CreateDateColumn({ type: 'datetime', generated: true, nullable: false })
  lastUpdate: string;

  @Column({ type: 'text', nullable: false })
  status: OrderStatus;

  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.order, {
    eager: true,
    cascade: true,
  })
  items: Array<OrderItem>;

  constructor(client: string, amount: number,  items: Array<OrderItem>) {
    this.client = client;
    this.items = items;
    this.amount = amount
    this.createdAt = DateTime.now().toISO();
    this.lastUpdate = this.createdAt;
    this.status = OrderStatus.WAITING_PAYMENT;
  }

  private setLastUpdate() {
    this.lastUpdate = DateTime.utc().toISO();
  }

  updateStatus(status: OrderStatus): void {
    this.status = status;
    this.setLastUpdate()
  }

  cancel(): void {
    this.status = OrderStatus.CANCELLED;
    this.setLastUpdate()
  }

  confirm(): void {
    this.status = OrderStatus.IN_QUEUE;
    this.setLastUpdate()
  }
}
