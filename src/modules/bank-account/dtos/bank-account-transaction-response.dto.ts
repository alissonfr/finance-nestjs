import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Category } from "src/modules/category/entities/category.entity"
import { PaymentMethod } from "src/modules/payment-method/entities/payment-method.entity"
import { Operation } from "src/shared/enum/operation.enum"
import { TransactionStatus } from "src/shared/enum/transaction-status.enum"
import { TransactionType } from "src/shared/enum/transaction-type.enum"
import { BankAccount } from "../entities/bank-account.entity"

export class BankAccountTransactionResponseDTO {
    @ApiProperty({ example: "Pagamento de conta de luz" })
    description: string

    @ApiProperty({ example: "Referente ao mês de junho" })
    notes: string

    @ApiProperty({ example: "2025-06-25T00:00:00Z" })
    date: Date

    @ApiProperty({ example: 200.5 })
    amount: number

    @ApiProperty({ enum: TransactionStatus })
    status: TransactionStatus

    @ApiProperty({ enum: Operation })
    operation: Operation

    @ApiProperty({ enum: TransactionType })
    type: TransactionType

    @ApiProperty({ type: () => Category })
    category: Category

    @ApiProperty({ type: () => BankAccount })
    bankAccount: BankAccount

    @ApiProperty({ type: () => PaymentMethod })
    paymentMethod: PaymentMethod

    @ApiPropertyOptional({
        example: {
            installment: 2,
            installments: 5,
            total: "1000.00",
        },
    })
    recurrency?: {
        installment: number
        installments: number
        total: string
    }
}
