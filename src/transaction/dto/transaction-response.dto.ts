import { BankAccount } from "src/bank-account/bank-account.entity";
import { User } from "src/user/entities/user.entity";
import { TransactionCategory } from "../entities/transaction-category.entity";

export class TransactionResponseDto {
  transactionId: number;
  date: Date;
  description: string;
  amount: string;
  category: TransactionCategory;
  bankAccount: BankAccount;
  user: User;
  }
  