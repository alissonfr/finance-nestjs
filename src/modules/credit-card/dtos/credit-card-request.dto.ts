import { Issuer } from "src/modules/issuer/entities/issuer.entity"

export class CreditCardRequest {
    name: string
    creditLimit: number
    dueDay: number
    closingDay: number
    issuer: Issuer
}
