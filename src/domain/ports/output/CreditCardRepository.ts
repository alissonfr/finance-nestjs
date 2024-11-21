import { CreditCard } from "src/domain/model/credit-card.entity";

export interface CreditCardRepository {
  findAll(): Promise<CreditCard[]>
  findById(id: number): Promise<CreditCard>
  save(user: CreditCard): Promise<CreditCard>
}

export const CreditCardRepository = Symbol('CreditCardRepository');