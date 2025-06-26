import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class BankAccountRequest {
    @ApiProperty({ example: "Conta Corrente Banco XPTO" })
    @IsString()
    @IsNotEmpty({ message: "O nome da conta é obrigatório." })
    name: string

    @ApiProperty({ example: 1000.0 })
    @IsNumber({}, { message: "O valor inicial deve ser um número." })
    @Min(0, { message: "O valor inicial não pode ser negativo." })
    initialAmount: number
}
