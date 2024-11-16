import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ example: 'alisson@gmail.com', required: true })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'alisson123', required: true })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
  password: string;
}