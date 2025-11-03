import { Injectable } from '@nestjs/common';
import type { CreateInvoiceDto, UpdateInvoiceDto } from '@saas-template/core';
import { Invoice } from '@saas-template/database';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class InvoicesRepository extends Repository<Invoice> {
  constructor(dataSource: DataSource) {
    super(Invoice, dataSource.createEntityManager());
  }

  async findAll(_userId: string): Promise<Invoice[]> {
    return this.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, _userId: string): Promise<Invoice | null> {
    return this.findOne({
      where: { id },
    });
  }

  async createInvoice(_userId: string, dto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = super.create({
      ...dto,
    });
    return this.save(invoice);
  }

  async updateInvoice(id: string, userId: string, dto: UpdateInvoiceDto): Promise<Invoice | null> {
    const invoice = await this.findById(id, userId);
    if (!invoice) {
      return null;
    }

    Object.assign(invoice, dto);
    return this.save(invoice);
  }

  async removeInvoice(id: string, userId: string): Promise<boolean> {
    const invoice = await this.findById(id, userId);
    if (!invoice) {
      return false;
    }

    await this.softRemove(invoice);
    return true;
  }
}
