import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BankAccountTransaction } from '../entities/bank-account-transaction.entity'
import { TransactionStatus } from 'src/shared/enum/transaction-status.enum'

@Injectable()
export class BankAccountTransactionService {
  constructor(
    @InjectRepository(BankAccountTransaction)
    private readonly repository: Repository<BankAccountTransaction>,
  ) {}

  async find(filters?: { name?: string }): Promise<BankAccountTransaction[]> {
    const transactions = this.repository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.category', 'category')
      .leftJoinAndSelect('transaction.bankAccount', 'bankAccount')
      .leftJoinAndSelect('transaction.paymentMethod', 'paymentMethod')
      .orderBy('transaction.date', 'DESC')

    if (filters.name) {
      transactions.orWhere('name ILIKE :name', { name: `%${filters.name}%` })
    }

    return transactions.getMany()
  }

  async findOne(
    bankAccountTransactionId: number,
  ): Promise<BankAccountTransaction> {
    const transaction = await this.repository.findOne({
      where: { bankAccountTransactionId },
    })
    if (!transaction) {
      throw new BadRequestException('Transaction not found')
    }
    return transaction
  }

  async create(input: BankAccountTransaction): Promise<BankAccountTransaction> {
    const transaction = this.repository.create(input)
    return await this.repository.save(transaction)
  }

  async update(
    id: number,
    updateData: { name?: string; initialAmount?: string },
  ): Promise<BankAccountTransaction> {
    const transaction = await this.findOne(id)
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found.`)
    }
    Object.assign(transaction, updateData)
    return this.repository.save(transaction)
  }

  async updateStatus(id: number): Promise<BankAccountTransaction> {
    const transaction = await this.findOne(id)
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found.`)
    }

    if (transaction.status === TransactionStatus.PAID) {
      transaction.status = TransactionStatus.PENDING
    } else {
      transaction.status = TransactionStatus.PAID
    }

    return this.repository.save(transaction)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
