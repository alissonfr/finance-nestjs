import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BankAccountTransaction } from 'src/modules/bank-account/entities/bank-account-transaction.entity'
import { Operation } from 'src/shared/enum/operation.enum'
import { Repository } from 'typeorm'
import { FinancialReportDTO } from '../dtos/financial-report.dto'
import { TransactionStatus } from 'src/shared/enum/transaction-status.enum'

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(BankAccountTransaction)
    private readonly bankAccountTransactionRepository: Repository<BankAccountTransaction>,
  ) {}

  async getFinancialReport({ year, month }): Promise<FinancialReportDTO> {
    const totalBalanceQuery = this.bankAccountTransactionRepository
      .createQueryBuilder('transaction')
      .select(
        `SUM(CASE WHEN transaction.operation = '${Operation.INCOME}' THEN transaction.amount ELSE -transaction.amount END)`,
        'total',
      )
      .where('EXTRACT(YEAR FROM transaction.date) = :year', { year })
      .andWhere('EXTRACT(MONTH FROM transaction.date) = :month', { month })
      .getRawOne()

    const incomeReceivedQuery = this.bankAccountTransactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .where('EXTRACT(YEAR FROM transaction.date) = :year', { year })
      .andWhere('EXTRACT(MONTH FROM transaction.date) = :month', { month })
      .andWhere('transaction.operation = :operation', {
        operation: Operation.INCOME,
      })
      .andWhere('transaction.status = :status', {
        status: TransactionStatus.PAID,
      })
      .getRawOne()

    const incomeExpectedQuery = this.bankAccountTransactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .where('EXTRACT(YEAR FROM transaction.date) = :year', { year })
      .andWhere('EXTRACT(MONTH FROM transaction.date) = :month', { month })
      .andWhere('transaction.operation = :operation', {
        operation: Operation.INCOME,
      })
      .andWhere('transaction.status = :status', {
        status: TransactionStatus.PENDING,
      })
      .getRawOne()

    const expensesPaidQuery = this.bankAccountTransactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .where('EXTRACT(YEAR FROM transaction.date) = :year', { year })
      .andWhere('EXTRACT(MONTH FROM transaction.date) = :month', { month })
      .andWhere('transaction.operation = :operation', {
        operation: Operation.EXPENSE,
      })
      .andWhere('transaction.status = :status', {
        status: TransactionStatus.PAID,
      })
      .getRawOne()

    const expensesExpectedQuery = this.bankAccountTransactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .where('EXTRACT(YEAR FROM transaction.date) = :year', { year })
      .andWhere('EXTRACT(MONTH FROM transaction.date) = :month', { month })
      .andWhere('transaction.operation = :operation', {
        operation: Operation.EXPENSE,
      })
      .andWhere('transaction.status = :status', {
        status: TransactionStatus.PENDING,
      })
      .getRawOne()

    const totalBalance = await totalBalanceQuery
    const incomeReceived = await incomeReceivedQuery
    const incomeExpected = await incomeExpectedQuery
    const expensesPaid = await expensesPaidQuery
    const expensesExpected = await expensesExpectedQuery

    const previousMonthBalance = await this.getPreviousMonthBalance(year, month)
    const percentageChange = previousMonthBalance
      ? ((totalBalance.total - previousMonthBalance) / previousMonthBalance) *
        100
      : 0

    const report: FinancialReportDTO = {
      totalBalance: {
        current: totalBalance.total || 0,
        percentageChange: percentageChange || 0,
      },
      income: {
        received: incomeReceived.total || 0,
        expected: incomeExpected.total || 0,
      },
      expenses: {
        paid: expensesPaid.total || 0,
        expected: expensesExpected.total || 0,
      },
    }

    return report
  }

  private async getPreviousMonthBalance(
    year: number,
    month: number,
  ): Promise<number> {
    let previousMonth = month - 1
    let previousYear = year

    if (previousMonth === 0) {
      previousMonth = 12 // December
      previousYear -= 1 // Go to the previous year
    }

    const previousMonthBalanceQuery = this.bankAccountTransactionRepository
      .createQueryBuilder('transaction')
      .select(
        `SUM(CASE WHEN transaction.operation = '${Operation.INCOME}' THEN transaction.amount ELSE -transaction.amount END)`,
        'total',
      )
      .where('EXTRACT(YEAR FROM transaction.date) = :previousYear', {
        previousYear,
      })
      .andWhere('EXTRACT(MONTH FROM transaction.date) = :previousMonth', {
        previousMonth,
      })
      .getRawOne()

    const previousMonthBalance = await previousMonthBalanceQuery

    return previousMonthBalance.total || 0
  }
}
