import { IsDate, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  invoice_id!: string;

  @IsNumber()
  amount!: number;

  @IsDate()
  payment_date!: Date;
}

export class UpdatePaymentDto {
  @IsOptional()
  @IsUUID()
  invoice_id?: string | undefined;

  @IsOptional()
  @IsNumber()
  amount?: number | undefined;

  @IsOptional()
  @IsDate()
  payment_date?: Date | undefined;
}

export class PaymentResponseDto {
  id!: string;
  invoice_id!: string;
  amount!: number;
  payment_date!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
