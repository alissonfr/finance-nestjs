import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class TransactionCategoryRequest {
  @ApiProperty({ example: 'Food', description: 'Name of the category', required: true })
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório.' })
  @IsString({ message: 'O nome da categoria deve ser um texto.' })
  name: string;

  @ApiProperty({ example: 123, description: 'ID do usuário associado à transação', required: true })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
  @IsNumberString({}, { message: 'O ID do usuário deve ser numérico.' })
  userId: number;
}
