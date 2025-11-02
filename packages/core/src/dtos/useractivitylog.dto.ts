import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateUseractivitylogDto {
  @IsUUID()
  user_id!: string;

  @IsString()
  @MinLength(1)
  action!: string;

  @IsDate()
  timestamp!: Date;
}

export class UpdateUseractivitylogDto {
  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  action?: string | undefined;

  @IsOptional()
  @IsDate()
  timestamp?: Date | undefined;
}

export class UseractivitylogResponseDto {
  id!: string;
  user_id!: string;
  action!: string;
  timestamp!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
