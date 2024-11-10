import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionCategory } from '../../domain/model/transaction-category.entity';
import { TransactionCategoryRepository } from '../../domain/ports/output/TransactionCategoryRepository';

@Injectable()
export class TransactionCategoryRepositoryImpl implements TransactionCategoryRepository {
  constructor(
    @InjectRepository(TransactionCategory)
    private readonly repository: Repository<TransactionCategory>,
  ) {}

  async findAll(): Promise<TransactionCategory[]> {
    return await this.repository.find();
  }

  async findById(transactionCategoryId: number): Promise<TransactionCategory> {
    return await this.repository.findOneByOrFail({ transactionCategoryId });
  }

  async save(transactionCategory: TransactionCategory): Promise<TransactionCategory> {
    return await this.repository.save(transactionCategory);
  }
}