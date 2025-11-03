import { Injectable } from '@nestjs/common';
import type { CreatePaymentDto, UpdatePaymentDto } from '@saas-template/core';
import { Payment } from '@saas-template/database';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentsRepository extends Repository<Payment> {
  constructor(dataSource: DataSource) {
    super(Payment, dataSource.createEntityManager());
  }

  async findAll(_userId: string): Promise<Payment[]> {
    return this.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, _userId: string): Promise<Payment | null> {
    return this.findOne({
      where: { id },
    });
  }

  async createPayment(_userId: string, dto: CreatePaymentDto): Promise<Payment> {
    const payment = super.create({
      ...dto,
    });
    return this.save(payment);
  }

  async updatePayment(id: string, userId: string, dto: UpdatePaymentDto): Promise<Payment | null> {
    const payment = await this.findById(id, userId);
    if (!payment) {
      return null;
    }

    Object.assign(payment, dto);
    return this.save(payment);
  }

  async removePayment(id: string, userId: string): Promise<boolean> {
    const payment = await this.findById(id, userId);
    if (!payment) {
      return false;
    }

    await this.softRemove(payment);
    return true;
  }
}
