import {
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @MinLength(1)
  currency!: string;
}

export class UpdateExpenseDto {
  @IsOptional()
  @IsNumber()
  amount?: number | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  description?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  currency?: string | undefined;
}

export class ExpenseResponseDto {
  id!: string;
  amount!: number;
  description?: string | undefined;
  currency!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
