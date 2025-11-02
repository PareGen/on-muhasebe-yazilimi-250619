import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'user_activity_logs' })
export class Useractivitylog extends BaseEntity {
  @Column()
  action!: string;

  @Column({ type: 'timestamp with time zone' })
  @Index('idx_user_activity_logs_timestamp')
  timestamp!: Date;


@Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_user_activity_logs_user_id')
  @ManyToOne('User', 'useractivitylogs')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
