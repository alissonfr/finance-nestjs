import { User } from "src/modules/user/entities/user.entity";

export class BankAccountResponse {
  bankAccountId?: number;
  name: string;
  initialAmount: number;
  totalAmount: number;
  user: User;
}