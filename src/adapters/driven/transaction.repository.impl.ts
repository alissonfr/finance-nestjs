import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Transaction } from '../../domain/model/transaction.entity';
import { TransactionRepository } from '../../domain/ports/output/TransactionRepository';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return await this.repository.find();
  }

  async findById(transactionId: number): Promise<Transaction> {
    return await this.repository.findOneByOrFail({ transactionId });
  }

  async save(transaction: DeepPartial<Transaction> ): Promise<Transaction> {
    const newTransaction = this.repository.create(transaction);
    return await this.repository.save(newTransaction);
  }
}