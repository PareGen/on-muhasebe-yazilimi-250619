import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Useractivitylog } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { UseractivitylogsController } from './useractivitylogs.controller';
import { UseractivitylogsService } from './useractivitylogs.service';
import { UseractivitylogsRepository } from './useractivitylogs.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Useractivitylog]),
    DatabaseModule,
  ],
  controllers: [UseractivitylogsController],
  providers: [UseractivitylogsService, UseractivitylogsRepository],
  exports: [UseractivitylogsService],
})
export class UseractivitylogsModule {}
