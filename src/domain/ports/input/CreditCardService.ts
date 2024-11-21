import { CreditCardResponse } from "src/adapters/model/response/credit-card-response.dto";

export interface CreditCardService {
  find(): Promise<CreditCardResponse[]>
}

export const CreditCardService = Symbol('CreditCardService');