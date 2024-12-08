import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionService } from "./transaction.service";
import { Transaction } from "../entities/transaction.entity";


@Injectable()
export class TransactionServiceImpl implements TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(input: Transaction): Promise<Transaction> {
    const transaction = this.transactionRepository.create(input);
    const savedTransaction = await this.transactionRepository.save(transaction);
    return savedTransaction;
  }

  async findOne(transactionId: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { transactionId } });
    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }
    return transaction;
  }
}
