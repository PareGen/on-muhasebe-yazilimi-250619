import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type {
  CreateUseractivitylogDto,
  UpdateUseractivitylogDto,
  UseractivitylogResponseDto,
} from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseractivitylogsService } from './user-activity-logs.service';

@Controller('useractivitylogs')
@UseGuards(JwtAuthGuard)
export class UseractivitylogsController {
  constructor(private readonly useractivitylogsService: UseractivitylogsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<UseractivitylogResponseDto[]> {
    return this.useractivitylogsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User
  ): Promise<UseractivitylogResponseDto> {
    return this.useractivitylogsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateUseractivitylogDto,
    @CurrentUser() user: User
  ): Promise<UseractivitylogResponseDto> {
    return this.useractivitylogsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUseractivitylogDto,
    @CurrentUser() user: User
  ): Promise<UseractivitylogResponseDto> {
    return this.useractivitylogsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.useractivitylogsService.remove(id, user.id);
  }
}
