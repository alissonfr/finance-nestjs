import { TransactionCategoryResponse } from "src/adapters/model/response/transaction-category-response.dto";

export interface TransactionCategoryService {
  find(): Promise<TransactionCategoryResponse[]>
}

export const TransactionCategoryService = Symbol('TransactionCategoryService');