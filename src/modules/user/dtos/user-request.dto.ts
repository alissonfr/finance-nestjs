import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator"

export class UserRequestDTO {
    @ApiProperty({ example: "João Silva" })
    @IsString()
    @IsNotEmpty({ message: "O nome é obrigatório." })
    name: string

    @ApiProperty({ example: "joao@email.com" })
    @IsEmail({}, { message: "Email inválido." })
    email: string

    @ApiProperty({ example: "12345678901", description: "CPF somente números, 11 dígitos" })
    @Matches(/^\d{11}$/, { message: "CPF deve conter exatamente 11 dígitos numéricos." })
    cpf: string

    @ApiProperty({ example: "senhaSegura123" })
    @IsString()
    @Length(6, 32, { message: "A senha deve ter entre 6 e 32 caracteres." })
    password: string
}
