import { api } from '@/lib/api';
import type { CreatePaymentDto, PaymentResponseDto, UpdatePaymentDto } from '@saas-template/core';

export const paymentsService = {
  async getAll(): Promise<PaymentResponseDto[]> {
    const response = await api.get('/payments');
    return response.data;
  },

  async getById(id: string): Promise<PaymentResponseDto> {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  },

  async create(data: CreatePaymentDto): Promise<PaymentResponseDto> {
    const response = await api.post('/payments', data);
    return response.data;
  },

  async update(id: string, data: UpdatePaymentDto): Promise<PaymentResponseDto> {
    const response = await api.put(`/payments/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/payments/${id}`);
  },
};
