import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  userId: number;

  @ApiProperty({ example: 'Alisson Rodrigues', description: 'Name of the user' })
  name: string;

  @ApiProperty({ example: 'alisson@gmail.com', description: 'Email address of the user' })
  email: string;

  @ApiProperty({ example: '11111111111', description: 'CPF (Cadastro de Pessoas Físicas) of the user' })
  cpf: string;
}