import { BankAccount } from "src/bank-account/bank-account.entity";
import { User } from "src/user/entities/user.entity";
import { TransactionCategory } from "../entities/transaction-category.entity";

export class CreateTransactionDto {
  date: Date;
  description: string;
  amount: string;
  category: TransactionCategory;
  account: BankAccount;
  user: User;
  }
  