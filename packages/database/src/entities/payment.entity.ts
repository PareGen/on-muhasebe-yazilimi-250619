import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Invoice } from './invoice.entity';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @Column({ type: 'integer' })
  amount!: number;

  @Column({ type: 'timestamp with time zone' })
  @Index('idx_payments_payment_date')
  payment_date!: Date;


@Column({ name: 'invoice_id' })
  invoice_id!: string;

  @Index('idx_payments_invoice_id')
  @ManyToOne('Invoice', 'payments')
  @JoinColumn({ name: 'invoice_id' })
  invoice!: Invoice;
}
