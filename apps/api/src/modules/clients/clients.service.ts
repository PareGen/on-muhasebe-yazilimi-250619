import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { ClientResponseDto, CreateClientDto, UpdateClientDto } from '@saas-template/core';
import type { Client } from '@saas-template/database';
import { ClientsRepository } from './clients.repository';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientsRepository: ClientsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ClientResponseDto[]> {
    const clients = await this.clientsRepository.findAll(userId);
    return clients.map((client: Client) => this.toResponseDto(client));
  }

  async findOne(id: string, userId: string): Promise<ClientResponseDto> {
    const client = await this.clientsRepository.findById(id, userId);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return this.toResponseDto(client);
  }

  async create(userId: string, dto: CreateClientDto): Promise<ClientResponseDto> {
    return this.uow.execute(async () => {
      const client = await this.clientsRepository.createClient(userId, dto);
      return this.toResponseDto(client);
    });
  }

  async update(id: string, userId: string, dto: UpdateClientDto): Promise<ClientResponseDto> {
    return this.uow.execute(async () => {
      const client = await this.clientsRepository.updateClient(id, userId, dto);
      if (!client) {
        throw new NotFoundException('Client not found');
      }
      return this.toResponseDto(client);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.clientsRepository.removeClient(id, userId);
      if (!deleted) {
        throw new NotFoundException('Client not found');
      }
    });
  }

  private toResponseDto(client: Client): ClientResponseDto {
    return {
      id: client.id,
      name: client.name,
      email: client.email ?? undefined,
      phone: client.phone ?? undefined,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    } as ClientResponseDto;
  }
}
