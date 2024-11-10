import { TransactionRequest } from "src/adapters/model/request/transaction-request.dto";
import { TransactionResponse } from "src/adapters/model/response/transaction-response.dto";

export interface TransactionService {
  find(): Promise<TransactionResponse[]>
  findById(transactionId: number): Promise<TransactionResponse>
  save(transaction: TransactionRequest): Promise<TransactionResponse>
  update(transactionId: number, transactionRequest: TransactionRequest): Promise<TransactionResponse>
}

export const TransactionService = Symbol('TransactionService');