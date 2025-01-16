import { Category } from "src/modules/category/entities/category.entity"
import { PaymentMethod } from "src/modules/payment-method/entities/payment-method.entity"
import { Operation } from "src/shared/enum/operation.enum"
import { TransactionStatus } from "src/shared/enum/transaction-status.enum"
import { TransactionType } from "src/shared/enum/transaction-type.enum"
import { BankAccount } from "../entities/bank-account.entity"

export class BankAccountTransactionResponseDTO {
  description: string
  notes: string
  date: Date
  amount: number
  status: TransactionStatus
  operation: Operation
  type: TransactionType
  category: Category
  bankAccount: BankAccount
  paymentMethod: PaymentMethod

  recurrency?: {
    installment: number
    installments: number
    total: string
  }
}
