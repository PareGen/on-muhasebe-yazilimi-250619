import { api } from '@/lib/api';
import type { ClientResponseDto, CreateClientDto, UpdateClientDto } from '@saas-template/core';

export const clientsService = {
  async getAll(): Promise<ClientResponseDto[]> {
    const response = await api.get('/clients');
    return response.data;
  },

  async getById(id: string): Promise<ClientResponseDto> {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  async create(data: CreateClientDto): Promise<ClientResponseDto> {
    const response = await api.post('/clients', data);
    return response.data;
  },

  async update(id: string, data: UpdateClientDto): Promise<ClientResponseDto> {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/clients/${id}`);
  },
};
