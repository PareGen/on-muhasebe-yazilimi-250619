import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreatePaymentDto, PaymentResponseDto, UpdatePaymentDto } from '@saas-template/core';
import type { Payment } from '@saas-template/database';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentsRepository.findAll(userId);
    return payments.map((payment: Payment) => this.toResponseDto(payment));
  }

  async findOne(id: string, userId: string): Promise<PaymentResponseDto> {
    const payment = await this.paymentsRepository.findById(id, userId);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return this.toResponseDto(payment);
  }

  async create(userId: string, dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    return this.uow.execute(async () => {
      const payment = await this.paymentsRepository.createPayment(userId, dto);
      return this.toResponseDto(payment);
    });
  }

  async update(id: string, userId: string, dto: UpdatePaymentDto): Promise<PaymentResponseDto> {
    return this.uow.execute(async () => {
      const payment = await this.paymentsRepository.updatePayment(id, userId, dto);
      if (!payment) {
        throw new NotFoundException('Payment not found');
      }
      return this.toResponseDto(payment);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.paymentsRepository.removePayment(id, userId);
      if (!deleted) {
        throw new NotFoundException('Payment not found');
      }
    });
  }

  private toResponseDto(payment: Payment): PaymentResponseDto {
    return {
      id: payment.id,
      invoice_id: payment.invoice_id,
      amount: payment.amount,
      payment_date: payment.payment_date,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}
