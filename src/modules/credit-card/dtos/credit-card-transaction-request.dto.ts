import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"

import { Category } from "src/modules/category/entities/category.entity"
import { TransactionType } from "src/shared/enum/transaction-type.enum"
import { CreditCard } from "../entities/credit-card.entity"

export class CreditCardTransactionRequest {
    @ApiProperty({ example: "Compra no supermercado" })
    @IsString()
    @IsNotEmpty({ message: "A descrição é obrigatória." })
    description: string

    @ApiProperty({ example: "2025-06-25T14:00:00Z" })
    @IsDateString({}, { message: "Data inválida. Use o formato ISO 8601." })
    date: Date

    @ApiProperty({ example: "Comprado com desconto" })
    @IsString()
    @IsNotEmpty({ message: "As observações são obrigatórias." })
    notes: string

    @ApiProperty({ example: 150.75 })
    @IsNumber({}, { message: "O valor deve ser numérico." })
    amount: number

    @ApiProperty({ enum: TransactionType })
    @IsEnum(TransactionType, { message: "Tipo de transação inválido." })
    type: TransactionType

    @ApiProperty({ type: () => Category })
    @ValidateNested()
    @Type(() => Category)
    category: Category

    @ApiProperty({ type: () => CreditCard })
    @ValidateNested()
    @Type(() => CreditCard)
    creditCard: CreditCard
}
