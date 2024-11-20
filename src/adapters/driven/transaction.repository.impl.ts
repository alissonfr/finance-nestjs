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

  async find({ page, limit, year, month }): Promise<Transaction[]> {
    const queryBuilder = this.repository.createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.category', 'category')
      .leftJoinAndSelect('transaction.account', 'account')
      .leftJoinAndSelect('transaction.user', 'user');
  
    if (year) queryBuilder.andWhere('EXTRACT(YEAR FROM transaction.date) = :year', { year });
    if (month) queryBuilder.andWhere('EXTRACT(MONTH FROM transaction.date) = :month', { month });
  
    queryBuilder.skip((page - 1) * limit).take(limit);
  
    return await queryBuilder.getMany();
  }
  

  async findById(transactionId: number): Promise<Transaction> {
    return await this.repository.findOneByOrFail({ transactionId });
  }

  async save(transaction: DeepPartial<Transaction> ): Promise<Transaction> {
    const newTransaction = this.repository.create(transaction);
    return await this.repository.save(newTransaction);
  }
}