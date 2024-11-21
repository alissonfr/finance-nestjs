import { TransactionRequest } from "src/adapters/model/request/transaction-request.dto";
import { GroupedTransactionsResponse } from "src/adapters/model/response/grouped-transactions-response.dto";
import { TransactionResponse } from "src/adapters/model/response/transaction-response.dto";

interface Filter { 
  page: number;
  limit: number;
  year?: number;
  month?: number;
}

export interface TransactionService {
  find({ page, limit, year, month }: Filter): Promise<TransactionResponse[]>
  findGrouped({ page, limit, year, month }: Filter): Promise<GroupedTransactionsResponse>
  findById(transactionId: number): Promise<TransactionResponse>
  save(transaction: TransactionRequest): Promise<TransactionResponse>
  update(transactionId: number, transactionRequest: TransactionRequest): Promise<TransactionResponse>
}

export const TransactionService = Symbol('TransactionService');