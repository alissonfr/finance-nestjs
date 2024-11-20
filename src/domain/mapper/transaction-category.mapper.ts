import { TransactionCategoryResponse } from "src/adapters/model/response/transaction-category-response.dto";
import { TransactionCategory } from "../model/transaction-category.entity";

export class TransactionCategoryMapper {
  static toResponse(entity: TransactionCategory): TransactionCategoryResponse {
    const response = new TransactionCategoryResponse();
    response.transactionCategoryId = entity?.transactionCategoryId;
    response.name = entity?.name;

    return response;
  }
}