import { BankAccount } from "src/modules/bank-account/bank-account.entity";
import { User } from "src/modules/user/entities/user.entity";
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
  