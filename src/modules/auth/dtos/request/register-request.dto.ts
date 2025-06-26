import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator"

export class RegisterRequestDTO {
    @ApiProperty({ example: "João Silva" })
    @IsNotEmpty({ message: "O nome é obrigatório." })
    name: string

    @ApiProperty({ example: "joao@email.com" })
    @IsEmail({}, { message: "Email inválido." })
    email: string

    @ApiProperty({ example: "12345678901" })
    @Matches(/^\d{11}$/, { message: "CPF deve conter exatamente 11 dígitos numéricos." })
    cpf: string

    @ApiProperty({ example: "senhaSegura123" })
    @Length(6, 32, { message: "A senha deve ter entre 6 e 32 caracteres." })
    password: string
}
