import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionResponseDto } from "../dto/transaction-response.dto";


export interface TransactionService {
  create(input: CreateTransactionDto): Promise<TransactionResponseDto>;
  findOne(transactionId: number): Promise<TransactionResponseDto>;
}