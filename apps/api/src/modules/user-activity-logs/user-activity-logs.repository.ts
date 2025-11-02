import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Useractivitylog } from '@saas-template/database';
import type { CreateUseractivitylogDto, UpdateUseractivitylogDto } from '@saas-template/core';

@Injectable()
export class UseractivitylogsRepository extends Repository<Useractivitylog> {
  constructor(private dataSource: DataSource) {
    super(Useractivitylog, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Useractivitylog[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Useractivitylog | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateUseractivitylogDto): Promise<Useractivitylog> {
    const useractivitylog = this.create({
      ...dto,
      userId,
    });
    return this.save(useractivitylog);
  }

  async update(id: string, userId: string, dto: UpdateUseractivitylogDto): Promise<Useractivitylog | null> {
    const useractivitylog = await this.findById(id, userId);
    if (!useractivitylog) {
      return null;
    }

    Object.assign(useractivitylog, dto);
    return this.save(useractivitylog);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const useractivitylog = await this.findById(id, userId);
    if (!useractivitylog) {
      return false;
    }

    await this.softRemove(useractivitylog);
    return true;
  }
}
