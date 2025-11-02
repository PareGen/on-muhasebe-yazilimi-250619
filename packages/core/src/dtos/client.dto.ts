import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  email?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  phone?: string | undefined;
}

export class ClientResponseDto {
  id!: string;
  name!: string;
  email?: string;
  phone?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
