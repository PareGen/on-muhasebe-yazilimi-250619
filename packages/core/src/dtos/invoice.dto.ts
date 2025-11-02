import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled'
}

export class CreateInvoiceDto {
  @IsUUID()
  client_id!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  @MinLength(1)
  currency!: string;

  @IsEnum(InvoiceStatus)
  status!: InvoiceStatus;
}

export class UpdateInvoiceDto {
  @IsOptional()
  @IsUUID()
  client_id?: string | undefined;

  @IsOptional()
  @IsNumber()
  amount?: number | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  currency?: string | undefined;

  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus | undefined;
}

export class InvoiceResponseDto {
  id!: string;
  client_id!: string;
  amount!: number;
  currency!: string;
  status!: InvoiceStatus;
  createdAt!: Date;
  updatedAt!: Date;
}
