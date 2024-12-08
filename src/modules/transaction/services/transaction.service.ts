import { Transaction } from "../entities/transaction.entity";

export interface TransactionService {
  create(input: Transaction): Promise<Transaction>;
  findOne(transactionId: number): Promise<Transaction>;
}