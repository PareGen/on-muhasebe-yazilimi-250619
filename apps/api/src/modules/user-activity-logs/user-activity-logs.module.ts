import { DatabaseModule } from '@/core/database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Useractivitylog } from '@saas-template/database';
import { UseractivitylogsController } from './user-activity-logs.controller';
import { UseractivitylogsRepository } from './user-activity-logs.repository';
import { UseractivitylogsService } from './user-activity-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Useractivitylog]), DatabaseModule],
  controllers: [UseractivitylogsController],
  providers: [UseractivitylogsService, UseractivitylogsRepository],
  exports: [UseractivitylogsService],
})
export class UseractivitylogsModule {}
