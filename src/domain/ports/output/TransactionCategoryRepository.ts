import { TransactionCategory } from "src/domain/model/transaction-category.entity";

export interface TransactionCategoryRepository {
  findAll(): Promise<TransactionCategory[]>
  findById(id: number): Promise<TransactionCategory>
  save(user: TransactionCategory): Promise<TransactionCategory>
}

export const TransactionCategoryRepository = Symbol('TransactionCategoryRepository');