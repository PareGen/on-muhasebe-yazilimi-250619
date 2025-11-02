import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Invoice } from '@saas-template/database';
import type { CreateInvoiceDto, UpdateInvoiceDto } from '@saas-template/core';

@Injectable()
export class InvoicesRepository extends Repository<Invoice> {
  constructor(private dataSource: DataSource) {
    super(Invoice, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Invoice[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Invoice | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.create({
      ...dto,
      userId,
    });
    return this.save(invoice);
  }

  async update(id: string, userId: string, dto: UpdateInvoiceDto): Promise<Invoice | null> {
    const invoice = await this.findById(id, userId);
    if (!invoice) {
      return null;
    }

    Object.assign(invoice, dto);
    return this.save(invoice);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const invoice = await this.findById(id, userId);
    if (!invoice) {
      return false;
    }

    await this.softRemove(invoice);
    return true;
  }
}
