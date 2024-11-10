import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../domain/model/account.entity';
import { AccountRepository } from '../../domain/ports/output/AccountRepository';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return await this.repository.find();
  }

  async findById(accountId: number): Promise<Account> {
    return await this.repository.findOneByOrFail({ accountId });
  }

  async save(account: Account): Promise<Account> {
    return await this.repository.save(account);
  }
}