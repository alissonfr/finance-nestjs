import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString, IsDateString } from 'class-validator';
import { TransactionType } from 'src/domain/enums/transaction-type.enum';

export class TransactionRequest {
  @ApiProperty({ example: '2023-11-09T14:30:00.000Z', description: 'Data da transação', required: true })
  @IsNotEmpty({ message: 'A data é obrigatória.' })
  @IsDateString({ }, { message: 'A data deve estar no formato ISO.' })
  date: Date;

  @ApiProperty({ example: 'Compra no supermercado', description: 'Descrição da transação', required: true })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @IsString({ message: 'A descrição deve ser um texto.' })
  description: string;

  @ApiProperty({ example: 'CREDIT_CARD', description: 'Tipo da transação' })
  type: TransactionType;

  @ApiProperty({ example: '150.00', description: 'Valor da transação', required: true })
  @IsNotEmpty({ message: 'O valor é obrigatório.' })
  @IsNumberString({}, { message: 'O valor deve ser numérico.' })
  amount: string;

  @ApiProperty({ example: 1, description: 'ID da categoria da transação', required: true })
  @IsNotEmpty({ message: 'A categoria é obrigatória.' })
  @IsNumberString({}, { message: 'O ID da categoria deve ser numérico.' })
  categoryId: number;

  @ApiProperty({ example: 1, description: 'ID da conta associada à transação', required: true })
  @IsNotEmpty({ message: 'A conta é obrigatória.' })
  @IsNumberString({}, { message: 'O ID da conta deve ser numérico.' })
  accountId: number;

  @ApiProperty({ example: 1, description: 'ID do cartão de crédito associada à transação', required: true })
  @IsNotEmpty({ message: 'O cartão de crédito é obrigatório.' })
  @IsNumberString({}, { message: 'O ID do cartão de crédito deve ser numérico.' })
  creditCardId: number;

  @ApiProperty({ example: 123, description: 'ID do usuário associado à transação', required: true })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
  @IsNumberString({}, { message: 'O ID do usuário deve ser numérico.' })
  userId: number;
}
