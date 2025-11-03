import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  User, 
  Project, 
  Invoice, 
  Expense, 
  Client, 
  Payment, 
  Useractivitylog 
} from '@saas-template/database';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        // If DATABASE_URL is provided (production), use it
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [User, Project, Invoice, Expense, Client, Payment, Useractivitylog],
            synchronize: false,
            logging: configService.get<string>('NODE_ENV') === 'development',
            autoLoadEntities: true,
            ssl:
              configService.get<string>('NODE_ENV') === 'production'
                ? { rejectUnauthorized: false }
                : false,
          };
        }
        
        // Otherwise use individual DB_* variables (development)
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST')!,
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME')!,
          password: configService.get<string>('DB_PASSWORD')!,
          database: configService.get<string>('DB_NAME')!,
          entities: [User, Project, Invoice, Expense, Client, Payment, Useractivitylog],
          synchronize: false,
          logging: configService.get<string>('NODE_ENV') === 'development',
          autoLoadEntities: true,
          ssl:
            configService.get<string>('NODE_ENV') === 'production'
              ? { rejectUnauthorized: false }
              : false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
