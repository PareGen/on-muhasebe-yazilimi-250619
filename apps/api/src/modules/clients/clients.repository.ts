import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Client } from '@saas-template/database';
import type { CreateClientDto, UpdateClientDto } from '@saas-template/core';

@Injectable()
export class ClientsRepository extends Repository<Client> {
  constructor(private dataSource: DataSource) {
    super(Client, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Client[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Client | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateClientDto): Promise<Client> {
    const client = this.create({
      ...dto,
      userId,
    });
    return this.save(client);
  }

  async update(id: string, userId: string, dto: UpdateClientDto): Promise<Client | null> {
    const client = await this.findById(id, userId);
    if (!client) {
      return null;
    }

    Object.assign(client, dto);
    return this.save(client);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const client = await this.findById(id, userId);
    if (!client) {
      return false;
    }

    await this.softRemove(client);
    return true;
  }
}
