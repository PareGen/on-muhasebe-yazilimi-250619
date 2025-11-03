import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateInvoiceDto, InvoiceResponseDto, UpdateInvoiceDto } from '@saas-template/core';
import type { Invoice } from '@saas-template/database';
import { InvoicesRepository } from './invoices.repository';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<InvoiceResponseDto[]> {
    const invoices = await this.invoicesRepository.findAll(userId);
    return invoices.map((invoice: Invoice) => this.toResponseDto(invoice));
  }

  async findOne(id: string, userId: string): Promise<InvoiceResponseDto> {
    const invoice = await this.invoicesRepository.findById(id, userId);
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return this.toResponseDto(invoice);
  }

  async create(userId: string, dto: CreateInvoiceDto): Promise<InvoiceResponseDto> {
    return this.uow.execute(async () => {
      const invoice = await this.invoicesRepository.createInvoice(userId, dto);
      return this.toResponseDto(invoice);
    });
  }

  async update(id: string, userId: string, dto: UpdateInvoiceDto): Promise<InvoiceResponseDto> {
    return this.uow.execute(async () => {
      const invoice = await this.invoicesRepository.updateInvoice(id, userId, dto);
      if (!invoice) {
        throw new NotFoundException('Invoice not found');
      }
      return this.toResponseDto(invoice);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.invoicesRepository.removeInvoice(id, userId);
      if (!deleted) {
        throw new NotFoundException('Invoice not found');
      }
    });
  }

  private toResponseDto(invoice: Invoice): InvoiceResponseDto {
    return {
      id: invoice.id,
      client_id: invoice.client_id,
      amount: invoice.amount,
      currency: invoice.currency,
      status: invoice.status as any,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }
}
