import { Injectable } from '@nestjs/common';
import type { CreateUseractivitylogDto, UpdateUseractivitylogDto } from '@saas-template/core';
import { Useractivitylog } from '@saas-template/database';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UseractivitylogsRepository extends Repository<Useractivitylog> {
  constructor(dataSource: DataSource) {
    super(Useractivitylog, dataSource.createEntityManager());
  }

  async findAll(_userId: string): Promise<Useractivitylog[]> {
    return this.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, _userId: string): Promise<Useractivitylog | null> {
    return this.findOne({
      where: { id },
    });
  }

  async createUseractivitylog(_userId: string, dto: CreateUseractivitylogDto): Promise<Useractivitylog> {
    const useractivitylog = super.create({
      ...dto,
    });
    return this.save(useractivitylog);
  }

  async updateUseractivitylog(
    id: string,
    userId: string,
    dto: UpdateUseractivitylogDto
  ): Promise<Useractivitylog | null> {
    const useractivitylog = await this.findById(id, userId);
    if (!useractivitylog) {
      return null;
    }

    Object.assign(useractivitylog, dto);
    return this.save(useractivitylog);
  }

  async removeUseractivitylog(id: string, userId: string): Promise<boolean> {
    const useractivitylog = await this.findById(id, userId);
    if (!useractivitylog) {
      return false;
    }

    await this.softRemove(useractivitylog);
    return true;
  }
}
