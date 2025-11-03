import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'expenses' })
export class Expense extends BaseEntity {
  @Column({ type: 'integer' })
  @Index('idx_expenses_amount')
  amount!: number;

  @Column({ nullable: true })
  description?: string;

  @Column()
  currency!: string;
}
