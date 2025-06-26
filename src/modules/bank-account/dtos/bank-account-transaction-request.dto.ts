import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator"

import { Category } from "src/modules/category/entities/category.entity"
import { PaymentMethod } from "src/modules/payment-method/entities/payment-method.entity"
import { Operation } from "src/shared/enum/operation.enum"
import { TransactionStatus } from "src/shared/enum/transaction-status.enum"
import { TransactionType } from "src/shared/enum/transaction-type.enum"
import { BankAccount } from "../entities/bank-account.entity"

export class BankAccountTransactionRequestDTO {
    @ApiProperty({ example: "Compra no supermercado" })
    @IsString()
    @IsNotEmpty({ message: "A descrição é obrigatória." })
    description: string

    @ApiProperty({ example: "Comprado com desconto de 10%" })
    @IsString()
    @IsNotEmpty({ message: "As observações são obrigatórias." })
    notes: string

    @ApiProperty({ example: "2025-06-25T14:00:00Z" })
    @IsDateString({}, { message: "Data inválida. Use o formato ISO 8601." })
    date: Date

    @ApiProperty({ example: 150.75 })
    @IsNumber({}, { message: "O valor deve ser numérico." })
    amount: number

    @ApiProperty({ enum: TransactionStatus })
    @IsEnum(TransactionStatus, { message: "Status inválido." })
    status: TransactionStatus

    @ApiProperty({ enum: Operation })
    @IsEnum(Operation, { message: "Operação inválida." })
    operation: Operation

    @ApiProperty({ enum: TransactionType })
    @IsEnum(TransactionType, { message: "Tipo de transação inválido." })
    type: TransactionType

    @ApiProperty({ type: () => Category })
    @ValidateNested()
    @Type(() => Category)
    category: Category

    @ApiProperty({ type: () => BankAccount })
    @ValidateNested()
    @Type(() => BankAccount)
    bankAccount: BankAccount

    @ApiProperty({ type: () => PaymentMethod })
    @ValidateNested()
    @Type(() => PaymentMethod)
    paymentMethod: PaymentMethod

    @ApiPropertyOptional({ example: 3 })
    @IsOptional()
    @IsInt({ message: "As parcelas devem ser um número inteiro." })
    @Min(1, { message: "As parcelas devem ser pelo menos 1." })
    installments?: number
}
