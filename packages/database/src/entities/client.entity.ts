import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'clients' })
export class Client extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true, unique: true })
  @Index('idx_clients_email', { unique: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

}
