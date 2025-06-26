import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginRequestDTO {
    @ApiProperty({ example: "usuario@email.com" })
    @IsEmail({}, { message: "Email inválido." })
    email: string

    @ApiProperty({ example: "senhaSegura123" })
    @IsString()
    @IsNotEmpty({ message: "A senha é obrigatória." })
    password: string
}
