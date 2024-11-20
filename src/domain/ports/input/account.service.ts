import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '../output/AccountRepository';
import { AccountService } from './AccountService';
import { AccountMapper } from 'src/domain/mapper/account.mapper';
import { AccountResponse } from 'src/adapters/model/response/account-response.dto';

@Injectable()
export class AccountServiceImpl implements AccountService {
  constructor(
    @Inject(AccountRepository)
    private readonly transactionCategoryRepository: AccountRepository,
  ) {}

  async find(): Promise<AccountResponse[]> {
    const accounts = await this.transactionCategoryRepository.findAll();
    return accounts.map(account => AccountMapper.toResponse(account));
  }
}