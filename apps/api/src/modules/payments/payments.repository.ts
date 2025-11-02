import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Payment } from '@saas-template/database';
import type { CreatePaymentDto, UpdatePaymentDto } from '@saas-template/core';

@Injectable()
export class PaymentsRepository extends Repository<Payment> {
  constructor(private dataSource: DataSource) {
    super(Payment, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Payment[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Payment | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreatePaymentDto): Promise<Payment> {
    const payment = this.create({
      ...dto,
      userId,
    });
    return this.save(payment);
  }

  async update(id: string, userId: string, dto: UpdatePaymentDto): Promise<Payment | null> {
    const payment = await this.findById(id, userId);
    if (!payment) {
      return null;
    }

    Object.assign(payment, dto);
    return this.save(payment);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const payment = await this.findById(id, userId);
    if (!payment) {
      return false;
    }

    await this.softRemove(payment);
    return true;
  }
}
