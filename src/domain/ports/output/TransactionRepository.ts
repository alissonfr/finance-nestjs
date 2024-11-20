import { DeepPartial } from 'typeorm';
import { Transaction } from '../../model/transaction.entity';

export interface TransactionRepository {
  find({ page, limit, year, month }): Promise<Transaction[]>
  findById(id: number): Promise<Transaction>
  save(user: DeepPartial<Transaction>): Promise<Transaction>
}

export const TransactionRepository = Symbol('TransactionRepository');