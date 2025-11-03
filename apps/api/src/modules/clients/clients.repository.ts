import { Injectable } from '@nestjs/common';
import type { CreateClientDto, UpdateClientDto } from '@saas-template/core';
import { Client } from '@saas-template/database';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClientsRepository extends Repository<Client> {
  constructor(dataSource: DataSource) {
    super(Client, dataSource.createEntityManager());
  }

  async findAll(_userId: string): Promise<Client[]> {
    return this.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, _userId: string): Promise<Client | null> {
    return this.findOne({
      where: { id },
    });
  }

  async createClient(_userId: string, dto: CreateClientDto): Promise<Client> {
    const client = super.create({
      ...dto,
    });
    return this.save(client);
  }

  async updateClient(id: string, userId: string, dto: UpdateClientDto): Promise<Client | null> {
    const client = await this.findById(id, userId);
    if (!client) {
      return null;
    }

    Object.assign(client, dto);
    return this.save(client);
  }

  async removeClient(id: string, userId: string): Promise<boolean> {
    const client = await this.findById(id, userId);
    if (!client) {
      return false;
    }

    await this.softRemove(client);
    return true;
  }
}
