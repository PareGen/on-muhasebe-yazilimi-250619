import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Expense } from '@saas-template/database';
import type { CreateExpenseDto, UpdateExpenseDto } from '@saas-template/core';

@Injectable()
export class ExpensesRepository extends Repository<Expense> {
  constructor(private dataSource: DataSource) {
    super(Expense, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Expense[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Expense | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateExpenseDto): Promise<Expense> {
    const expense = this.create({
      ...dto,
      userId,
    });
    return this.save(expense);
  }

  async update(id: string, userId: string, dto: UpdateExpenseDto): Promise<Expense | null> {
    const expense = await this.findById(id, userId);
    if (!expense) {
      return null;
    }

    Object.assign(expense, dto);
    return this.save(expense);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const expense = await this.findById(id, userId);
    if (!expense) {
      return false;
    }

    await this.softRemove(expense);
    return true;
  }
}
