import { Injectable } from '@nestjs/common';
import type { CreateExpenseDto, UpdateExpenseDto } from '@saas-template/core';
import { Expense } from '@saas-template/database';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ExpensesRepository extends Repository<Expense> {
  constructor(dataSource: DataSource) {
    super(Expense, dataSource.createEntityManager());
  }

  async findAll(_userId: string): Promise<Expense[]> {
    return this.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, _userId: string): Promise<Expense | null> {
    return this.findOne({
      where: { id },
    });
  }

  async createExpense(_userId: string, dto: CreateExpenseDto): Promise<Expense> {
    const expense = super.create({
      ...dto,
    });
    return this.save(expense);
  }

  async updateExpense(id: string, userId: string, dto: UpdateExpenseDto): Promise<Expense | null> {
    const expense = await this.findById(id, userId);
    if (!expense) {
      return null;
    }

    Object.assign(expense, dto);
    return this.save(expense);
  }

  async removeExpense(id: string, userId: string): Promise<boolean> {
    const expense = await this.findById(id, userId);
    if (!expense) {
      return false;
    }

    await this.softRemove(expense);
    return true;
  }
}
