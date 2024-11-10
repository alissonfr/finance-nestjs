import { ApiProperty } from '@nestjs/swagger';
import { TransactionCategoryResponse } from './transaction-category-response.dto';
import { AccountResponse } from './account-response.dto';
import { UserResponse } from './user-response.dto';

export class TransactionResponse {
  @ApiProperty({ example: 1, description: 'Unique identifier of the transaction' })
  transactionId: number;

  @ApiProperty({ example: '2023-11-09T14:30:00.000Z', description: 'Date of the transaction' })
  date: Date;

  @ApiProperty({ example: 'Grocery shopping', description: 'Description of the transaction' })
  description: string;

  @ApiProperty({ example: '150.00', description: 'Amount of the transaction' })
  amount: string;

  @ApiProperty({ type: TransactionCategoryResponse, description: 'Category of the transaction' })
  category: TransactionCategoryResponse;

  @ApiProperty({ type: AccountResponse, description: 'Account associated with the transaction' })
  account: AccountResponse;

  @ApiProperty({ type: UserResponse, description: 'User associated with the transaction' })
  user: UserResponse;
}
