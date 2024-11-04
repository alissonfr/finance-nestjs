import { randomUUID } from 'crypto';

export class Transaction {
  transactionId: string;
  amount: string;
  isPaid: string;
  date: string;
  description: string;
  categoryId: string;
  bankAccountId: string;
  accountId: string;

  constructor({ amount, isPaid, date, description, categoryId, bankAccountId, accountId }: 
    { amount: string, isPaid: string, date: string, description: string, categoryId: string, bankAccountId: string, accountId: string }) {
    this.transactionId = randomUUID();
    this.amount = amount;
    this.isPaid = isPaid;
    this.date = date;
    this.description = description;
    this.categoryId = categoryId;
    this.bankAccountId = bankAccountId;
    this.accountId = accountId;
  }
}