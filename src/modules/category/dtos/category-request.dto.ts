import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Matches } from "class-validator"

export class CategoryRequestDTO {
    @ApiProperty({ example: "Alimentação" })
    @IsString()
    @IsNotEmpty({ message: "O nome da categoria é obrigatório." })
    name: string

    @ApiProperty({ example: "#FF5733", description: "Cor no formato hexadecimal (#RRGGBB)" })
    @IsString()
    @Matches(/^#([0-9A-Fa-f]{6})$/, { message: "A cor deve estar no formato hexadecimal (#RRGGBB)." })
    color: string

    @ApiProperty({ example: "shopping-cart", description: "Nome do ícone (ex: ícone do FontAwesome ou similar)" })
    @IsString()
    @IsNotEmpty({ message: "O ícone da categoria é obrigatório." })
    icon: string
}
