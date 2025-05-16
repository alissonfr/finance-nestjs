import { User } from "src/modules/user/entities/user.entity";
import { CreditCardTransaction } from "../entities/credit-card-transaction.entity";
import { Issuer } from "src/modules/issuer/entities/issuer.entity";

export class CreditCardWithTransaction {
    creditCardId?: number
    name: string
    dueDate: string
    closingDate: string
    totalAmount: string
    transactions: CreditCardTransaction[]
    user: User
    issuer: Issuer
}