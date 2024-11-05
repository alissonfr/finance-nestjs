import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserRequest {
  @ApiProperty({ example: 'Alisson Rodrigues', required: true })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @ApiProperty({ example: 'alisson@gmail.com', required: true })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '11111111111', required: true })
  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @Length(11, 11)
  cpf: string;

  @ApiProperty({ example: 'alisson123', required: true })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
  password: string;
}