import { api } from '@/lib/api';
import type { CreateExpenseDto, ExpenseResponseDto, UpdateExpenseDto } from '@saas-template/core';

export const expensesService = {
  async getAll(): Promise<ExpenseResponseDto[]> {
    const response = await api.get('/expenses');
    return response.data;
  },

  async getById(id: string): Promise<ExpenseResponseDto> {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  async create(data: CreateExpenseDto): Promise<ExpenseResponseDto> {
    const response = await api.post('/expenses', data);
    return response.data;
  },

  async update(id: string, data: UpdateExpenseDto): Promise<ExpenseResponseDto> {
    const response = await api.put(`/expenses/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/expenses/${id}`);
  },
};
