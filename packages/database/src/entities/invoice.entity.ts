import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Client } from './client.entity';

@Entity({ name: 'invoices' })
export class Invoice extends BaseEntity {
  @Column({ type: 'integer' })
  amount!: number;

  @Column()
  currency!: string;

  @Column({ type: 'enum', enum: ['pending', 'paid', 'cancelled'] })
  @Index('idx_invoices_status')
  status!: 'pending' | 'paid' | 'cancelled';

  @Column({ name: 'client_id' })
  client_id!: string;

  @Index('idx_invoices_client_id')
  @ManyToOne('Client', 'invoices')
  @JoinColumn({ name: 'client_id' })
  client!: Client;
}
