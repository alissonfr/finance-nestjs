import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class AccountRequest {
  @ApiProperty({ example: 'Personal Account', description: 'Name of the account', required: true })
  @IsNotEmpty({ message: 'O nome da conta é obrigatório.' })
  @IsString({ message: 'O nome da conta deve ser um texto.' })
  name: string;

  @ApiProperty({ example: '1000.00', description: 'Valor inicial da conta', required: true })
  @IsNotEmpty({ message: 'O valor inicial é obrigatório.' })
  @IsNumberString({}, { message: 'O valor inicial deve ser numérico.' })
  initialAmount: string;

  @ApiProperty({ example: 123, description: 'ID do usuário associado à transação', required: true })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
  @IsNumberString({}, { message: 'O ID do usuário deve ser numérico.' })
  userId: number;
}
