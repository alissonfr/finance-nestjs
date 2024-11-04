import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserRequest {
  name: string;
  @ApiProperty({ example: 'rehmat.sayani@gmail.com', required: true })
  @IsNotEmpty()
  email: string;
  cpf: string;
}