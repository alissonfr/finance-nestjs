import { TransactionResponse } from "../../adapters/model/response/transaction-response.dto";
import { Transaction } from "../model/transaction.entity";
import { AccountMapper } from "./account.mapper";
import { CreditCardMapper } from "./credit-card.mapper";
import { TransactionCategoryMapper } from "./transaction-category.mapper";
import { UserMapper } from "./user.mapper";

export class TransactionMapper {
  static toResponse(entity: Transaction): TransactionResponse {
    const response = new TransactionResponse();
    response.transactionId = entity.transactionId;
    response.date = entity.date;
    response.description = entity.description;
    response.amount = entity.amount;
    response.category = TransactionCategoryMapper.toResponse(entity.category);
    response.account = AccountMapper.toResponse(entity.account);
    response.creditCard = CreditCardMapper.toResponse(entity.creditCard);
    response.user = UserMapper.toResponse(entity.user);
    
    return response;
  }
}