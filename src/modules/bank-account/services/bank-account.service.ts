import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from '../entities/bank-account.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { parseCurrencyToNumber } from 'src/shared/utils/parser';

class CreateBankAccountInput {
  name: string;
  initialAmount: string;
  user: User;
}

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly repository: Repository<BankAccount>,
  ) {}

  async create(input: CreateBankAccountInput): Promise<BankAccount> {
    const account = this.repository.create({
      ...input,
      initialAmount: parseCurrencyToNumber(input.initialAmount)
    });
    return await this.repository.save(account);
  }

  async find(): Promise<BankAccount[]> {
    const accounts = await this.repository.find();
    return accounts;
  }

  async findOne(bankAccountId: number): Promise<BankAccount> {
    const account = await this.repository.findOne({ where: { bankAccountId } });
    if (!account) {
      throw new BadRequestException('Bank account not found');
    }
    return account;
  }

}
