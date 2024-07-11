import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IOrder, Order } from './order.entity';

export interface IOrderItem {
  id: string;
  name: string;
  order: IOrder;
}

@Entity()
export class OrderItem implements IOrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @ManyToOne(() => Order, (order: Order) => order.items)
  @JoinColumn()
  order: IOrder;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
