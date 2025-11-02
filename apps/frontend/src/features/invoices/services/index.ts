import { api } from '@/lib/api';
import type { InvoiceResponseDto, CreateInvoiceDto, UpdateInvoiceDto } from '@saas-template/core';

export const invoicesService = {
  async getAll(): Promise<InvoiceResponseDto[]> {
    const response = await api.get('/invoices');
    return response.data;
  },

  async getById(id: string): Promise<InvoiceResponseDto> {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },

  async create(data: CreateInvoiceDto): Promise<InvoiceResponseDto> {
    const response = await api.post('/invoices', data);
    return response.data;
  },

  async update(id: string, data: UpdateInvoiceDto): Promise<InvoiceResponseDto> {
    const response = await api.put(`/invoices/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/invoices/${id}`);
  },
};
