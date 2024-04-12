import { Column } from 'typeorm';
import { DateTime } from 'luxon';
export interface IOrder {
  id: string;
  client: string;
  createdAt: string;
  lastUpdate: string;
  status: string;
  updateStatus(status: string): void;
}

export class Order implements IOrder {
  @Column({ type: 'text', nullable: false })
  id: string;

  @Column({ type: 'text', nullable: false })
  client: string;

  @Column({ type: 'text', nullable: false })
  createdAt: string;

  @Column({ type: 'text', nullable: false })
  lastUpdate: string;

  @Column({ type: 'text', nullable: false })
  status: string;

  updateStatus(status: string): void {
    this.status = status;
    this.lastUpdate = DateTime.utc().toISO();
  }
}
