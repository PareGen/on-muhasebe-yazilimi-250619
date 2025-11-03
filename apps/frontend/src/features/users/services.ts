import { api } from '@/lib/api';
import type { UserResponseDto, UpdateUserDto } from '@saas-template/core';

export const usersService = {
  async getAll(): Promise<UserResponseDto[]> {
    const response = await api.get<UserResponseDto[]>('/users');
    return response.data;
  },

  async getById(id: string): Promise<UserResponseDto> {
    const response = await api.get<UserResponseDto>(`/users/${id}`);
    return response.data;
  },

  async update(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
    const response = await api.put<UserResponseDto>(`/users/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
