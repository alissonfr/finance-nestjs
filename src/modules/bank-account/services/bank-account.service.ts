import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from '../entities/bank-account.entity';
import { User } from 'src/modules/user/entities/user.entity';

class CreateBankAccountInput {
  name: string;
  initialAmount: number;
  user: User;
}

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly repository: Repository<BankAccount>,
  ) {}

  async find(filters?: { name?: string }): Promise<BankAccount[]> {
    const bankAccounts = this.repository.createQueryBuilder();

    if(filters.name) {
      bankAccounts.orWhere('name ILIKE :name', { name: `%${filters.name}%` });
    }

    return bankAccounts.getMany();
  }

  async findOne(bankAccountId: number): Promise<BankAccount> {
    const account = await this.repository.findOne({ where: { bankAccountId } });
    if (!account) {
      throw new BadRequestException('Bank account not found');
    }
    return account;
  }

  async create(input: CreateBankAccountInput): Promise<BankAccount> {
    const account = this.repository.create(input);
    return await this.repository.save(account);
  }

  async update(id: number, updateData: { name?: string, initialAmount?: string;}): Promise<BankAccount> {
    const bankAccount = await this.findOne(id);
    if (!bankAccount) {
      throw new NotFoundException(`Bank account with ID ${id} not found.`);
    }
    Object.assign(bankAccount, updateData);
    return this.repository.save(bankAccount);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

}
