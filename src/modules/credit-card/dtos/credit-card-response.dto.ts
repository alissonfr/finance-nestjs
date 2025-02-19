import { User } from "src/modules/user/entities/user.entity";

export class CreditCardResponse {
    creditCardId?: number
    name: string
    creditLimit: number
    dueDay: number
    closingDay: number
    user: User
}