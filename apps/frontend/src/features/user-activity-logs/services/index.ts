import { api } from '@/lib/api';
import type {
  CreateUseractivitylogDto,
  UpdateUseractivitylogDto,
  UseractivitylogResponseDto,
} from '@saas-template/core';

export const useractivitylogsService = {
  async getAll(): Promise<UseractivitylogResponseDto[]> {
    const response = await api.get('/useractivitylogs');
    return response.data;
  },

  async getById(id: string): Promise<UseractivitylogResponseDto> {
    const response = await api.get(`/useractivitylogs/${id}`);
    return response.data;
  },

  async create(data: CreateUseractivitylogDto): Promise<UseractivitylogResponseDto> {
    const response = await api.post('/useractivitylogs', data);
    return response.data;
  },

  async update(id: string, data: UpdateUseractivitylogDto): Promise<UseractivitylogResponseDto> {
    const response = await api.put(`/useractivitylogs/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/useractivitylogs/${id}`);
  },
};
