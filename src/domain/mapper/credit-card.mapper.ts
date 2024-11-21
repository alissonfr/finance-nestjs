import { CreditCardResponse } from "src/adapters/model/response/credit-card-response.dto";
import { CreditCard } from "../model/credit-card.entity";

export class CreditCardMapper {
  static toResponse(entity: CreditCard): CreditCardResponse {
    const response = new CreditCardResponse();
    response.creditCardId = entity?.creditCardId;
    response.name = entity?.name;
    response.creditLimit = entity?.creditLimit;
    response.brand = entity?.brand;
    response.closingDate = entity?.closingDate;
    response.dueDate = entity?.dueDate;

    return response;
  }
}