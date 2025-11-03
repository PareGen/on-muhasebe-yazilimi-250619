import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateExpenseDto, ExpenseResponseDto, UpdateExpenseDto } from '@saas-template/core';
import type { Expense } from '@saas-template/database';
import { ExpensesRepository } from './expenses.repository';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly expensesRepository: ExpensesRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ExpenseResponseDto[]> {
    const expenses = await this.expensesRepository.findAll(userId);
    return expenses.map((expense: Expense) => this.toResponseDto(expense));
  }

  async findOne(id: string, userId: string): Promise<ExpenseResponseDto> {
    const expense = await this.expensesRepository.findById(id, userId);
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }
    return this.toResponseDto(expense);
  }

  async create(userId: string, dto: CreateExpenseDto): Promise<ExpenseResponseDto> {
    return this.uow.execute(async () => {
      const expense = await this.expensesRepository.createExpense(userId, dto);
      return this.toResponseDto(expense);
    });
  }

  async update(id: string, userId: string, dto: UpdateExpenseDto): Promise<ExpenseResponseDto> {
    return this.uow.execute(async () => {
      const expense = await this.expensesRepository.updateExpense(id, userId, dto);
      if (!expense) {
        throw new NotFoundException('Expense not found');
      }
      return this.toResponseDto(expense);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.expensesRepository.removeExpense(id, userId);
      if (!deleted) {
        throw new NotFoundException('Expense not found');
      }
    });
  }

  private toResponseDto(expense: Expense): ExpenseResponseDto {
    return {
      id: expense.id,
      amount: expense.amount,
      description: expense.description ?? undefined,
      currency: expense.currency,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
    } as ExpenseResponseDto;
  }
}
