import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserRequest {
  @ApiProperty({ example: 'Alisson Rodrigues', required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'alisson@gmail.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12312312312', required: true })
  @IsNotEmpty()
  @Length(11, 11)
  cpf: string;
}