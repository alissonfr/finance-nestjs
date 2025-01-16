import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import * as accounting from "accounting"
import { DeleteTransactionOptions } from "src/shared/enum/delete-transaction-options.enum"
import { TransactionStatus } from "src/shared/enum/transaction-status.enum"
import { TransactionType } from "src/shared/enum/transaction-type.enum"
import { Repository } from "typeorm"
import { uuidv7 } from "uuidv7"
import { BankAccountTransactionRequestDTO } from "../dtos/bank-account-transaction-request.dto"
import { BankAccountTransactionResponseDTO } from "../dtos/bank-account-transaction-response.dto"
import { BankAccountTransaction } from "../entities/bank-account-transaction.entity"

const TWENTY_YEARS_IN_MONTHS = 20 * 12

@Injectable()
export class BankAccountTransactionService {
  constructor(
    @InjectRepository(BankAccountTransaction)
    private readonly repository: Repository<BankAccountTransaction>,
  ) {}

  async find({ month, year, name }): Promise<BankAccountTransactionResponseDTO[]> {
    const transactions = this.repository
      .createQueryBuilder("transaction")
      .leftJoinAndSelect("transaction.category", "category")
      .leftJoinAndSelect("transaction.bankAccount", "bankAccount")
      .leftJoinAndSelect("transaction.paymentMethod", "paymentMethod")
      .orderBy("transaction.date", "DESC")

    if (name) {
      transactions.orWhere("name ILIKE :name", { name: `%${name}%` })
    }

    if (month && year) {
      transactions.andWhere("EXTRACT(YEAR FROM transaction.date) = :year", { year })
      transactions.andWhere("EXTRACT(MONTH FROM transaction.date) = :month", { month })
    }

    const results = await transactions.getMany()
    const mappedResults = await Promise.all(
      results.map(async transaction => {
        if (transaction.type === TransactionType.SINGLE) {
          return transaction as BankAccountTransactionResponseDTO
        }

        const installments = await this.repository.find({
          where: { finTransactionId: transaction.finTransactionId },
          order: { date: { direction: "ASC" } },
        })

        const recurrency = {
          installment: installments.findIndex(t => t.bankAccountTransactionId === transaction.bankAccountTransactionId) + 1,
          installments: installments.length,
          total: accounting.formatMoney(accounting.toFixed(transaction.amount * installments.length, 2), {
            symbol: "R$",
            format: "%v %s",
          }),
        }
        return { ...transaction, recurrency }
      }),
    )

    return mappedResults
  }

  async findOne(bankAccountTransactionId: number): Promise<BankAccountTransaction> {
    const transaction = await this.repository.findOne({
      where: { bankAccountTransactionId },
      relations: ["category", "bankAccount", "paymentMethod"],
    })
    if (!transaction) {
      throw new BadRequestException("Transaction not found")
    }
    return transaction
  }

  async create(input: BankAccountTransactionRequestDTO): Promise<void> {
    const queryRunner = this.repository.manager.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const FIN_TRANSACTION_ID = uuidv7()

    try {
      const numberOfInstallments = this.getNumberOfInstallments(input)

      const transactions = []

      if (numberOfInstallments <= 0) {
        transactions.push(input)
      }

      for (let i = 0; i < numberOfInstallments; i++) {
        const date = new Date(input.date)
        date.setMonth(date.getMonth() + i)

        const amount =
          input.type === TransactionType.IN_INSTALLMENTS ? accounting.toFixed(input.amount / input.installments, 2) : input.amount

        transactions.push({ ...input, amount, date, finTransactionId: FIN_TRANSACTION_ID })
      }

      await this.repository.createQueryBuilder().insert().into(BankAccountTransaction).values(transactions).execute()

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  private getNumberOfInstallments(transaction: BankAccountTransactionRequestDTO): number {
    if (transaction.type === TransactionType.RECURRENT) {
      return TWENTY_YEARS_IN_MONTHS
    }

    if (transaction.type === TransactionType.IN_INSTALLMENTS) {
      return transaction.installments
    }

    return 0
  }

  async update(id: number, updateData: { name?: string; initialAmount?: string }): Promise<BankAccountTransaction> {
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

  async delete(id: number, option?: DeleteTransactionOptions): Promise<void> {
    if (!option) {
      await this.repository.delete(id)
      return
    }

    if (option === DeleteTransactionOptions.CURRENT) {
      await this.repository.delete(id)
    }

    const finTransactionId = (await this.findOne(id)).finTransactionId
    if (option === DeleteTransactionOptions.CURRENT_AND_NEXT) {
      const transactions = await this.repository.find({ where: { finTransactionId } })
      const startIndex = transactions.findIndex(t => t.bankAccountTransactionId === id)

      for (const t of transactions.slice(startIndex)) {
        await this.repository.delete({ bankAccountTransactionId: t.bankAccountTransactionId })
      }
    }

    if (option === DeleteTransactionOptions.CURRENT_AND_NEXT_AND_PREVIOUS) {
      await this.repository.delete({ finTransactionId })
    }

    throw new BadRequestException("Invalid option")
  }
}
