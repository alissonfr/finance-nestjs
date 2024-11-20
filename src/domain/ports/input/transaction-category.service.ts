import { Inject, Injectable } from '@nestjs/common';
import { TransactionCategoryService } from './TransactionCategoryService';
import { TransactionCategoryMapper } from 'src/domain/mapper/transaction-category.mapper';
import { TransactionCategoryResponse } from 'src/adapters/model/response/transaction-category-response.dto';
import { TransactionCategoryRepository } from '../output/TransactionCategoryRepository';

@Injectable()
export class TransactionCategoryServiceImpl implements TransactionCategoryService {
  constructor(
    @Inject(TransactionCategoryRepository)
    private readonly transactionCategoryRepository: TransactionCategoryRepository,
  ) {}

  async find(): Promise<TransactionCategoryResponse[]> {
    const categories = await this.transactionCategoryRepository.findAll();
    return categories.map(category => TransactionCategoryMapper.toResponse(category));
  }
}