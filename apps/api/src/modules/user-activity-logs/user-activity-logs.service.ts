import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  CreateUseractivitylogDto,
  UpdateUseractivitylogDto,
  UseractivitylogResponseDto,
} from '@saas-template/core';
import type { Useractivitylog } from '@saas-template/database';
import { UseractivitylogsRepository } from './user-activity-logs.repository';

@Injectable()
export class UseractivitylogsService {
  constructor(
    private readonly useractivitylogsRepository: UseractivitylogsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<UseractivitylogResponseDto[]> {
    const useractivitylogs = await this.useractivitylogsRepository.findAll(userId);
    return useractivitylogs.map((useractivitylog: Useractivitylog) =>
      this.toResponseDto(useractivitylog)
    );
  }

  async findOne(id: string, userId: string): Promise<UseractivitylogResponseDto> {
    const useractivitylog = await this.useractivitylogsRepository.findById(id, userId);
    if (!useractivitylog) {
      throw new NotFoundException('Useractivitylog not found');
    }
    return this.toResponseDto(useractivitylog);
  }

  async create(userId: string, dto: CreateUseractivitylogDto): Promise<UseractivitylogResponseDto> {
    return this.uow.execute(async () => {
      const useractivitylog = await this.useractivitylogsRepository.createUseractivitylog(userId, dto);
      return this.toResponseDto(useractivitylog);
    });
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateUseractivitylogDto
  ): Promise<UseractivitylogResponseDto> {
    return this.uow.execute(async () => {
      const useractivitylog = await this.useractivitylogsRepository.updateUseractivitylog(id, userId, dto);
      if (!useractivitylog) {
        throw new NotFoundException('Useractivitylog not found');
      }
      return this.toResponseDto(useractivitylog);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.useractivitylogsRepository.removeUseractivitylog(id, userId);
      if (!deleted) {
        throw new NotFoundException('Useractivitylog not found');
      }
    });
  }

  private toResponseDto(useractivitylog: Useractivitylog): UseractivitylogResponseDto {
    return {
      id: useractivitylog.id,
      user_id: useractivitylog.user_id,
      action: useractivitylog.action,
      timestamp: useractivitylog.timestamp,
      createdAt: useractivitylog.createdAt,
      updatedAt: useractivitylog.updatedAt,
    };
  }
}
