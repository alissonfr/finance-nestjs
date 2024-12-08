import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionResponseDto } from "../dto/transaction-response.dto";
import { TransactionService } from "./transaction.service";
import { Transaction } from "../entities/transaction.entity";


@Injectable()
export class TransactionServiceImpl implements TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(data: CreateTransactionDto): Promise<TransactionResponseDto> {
    const transaction = this.transactionRepository.create(data);
    const savedTransaction = await this.transactionRepository.save(transaction);
    return this.toResponseDto(savedTransaction);
  }

  async findOne(transactionId: number): Promise<TransactionResponseDto> {
    const transaction = await this.transactionRepository.findOne({ where: { transactionId } });
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return this.toResponseDto(transaction);
  }

  private toResponseDto(transaction: Transaction): TransactionResponseDto {
    return {
      transactionId: transaction.transactionId, 
      date: transaction.date, 
      description: transaction.description, 
      amount: transaction.amount, 
      category: transaction.category, 
      bankAccount: transaction.bankAccount, 
      user: transaction.user, 
    };
  }
}
