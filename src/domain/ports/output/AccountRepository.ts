import { Account } from "src/domain/model/account.entity";

export interface AccountRepository {
  findAll(): Promise<Account[]>
  findById(id: number): Promise<Account>
  save(user: Account): Promise<Account>
}

export const AccountRepository = Symbol('AccountRepository');