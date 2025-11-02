import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientsRepository } from './clients.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    DatabaseModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService, ClientsRepository],
  exports: [ClientsService],
})
export class ClientsModule {}
