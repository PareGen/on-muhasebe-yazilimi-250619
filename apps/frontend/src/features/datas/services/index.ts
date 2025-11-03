import { api } from '@/lib/api';

export interface DataResponseDto {
  id: string;
  name: string;
  content: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDataDto {
  name: string;
  content: unknown;
}

export interface UpdateDataDto {
  name?: string;
  content?: unknown;
}

export const datasService = {
  async getAll(): Promise<DataResponseDto[]> {
    const response = await api.get('/datas');
    return response.data;
  },

  async getById(id: string): Promise<DataResponseDto> {
    const response = await api.get(`/datas/${id}`);
    return response.data;
  },

  async create(data: CreateDataDto): Promise<DataResponseDto> {
    const response = await api.post('/datas', data);
    return response.data;
  },

  async update(id: string, data: UpdateDataDto): Promise<DataResponseDto> {
    const response = await api.put(`/datas/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/datas/${id}`);
  },
};
