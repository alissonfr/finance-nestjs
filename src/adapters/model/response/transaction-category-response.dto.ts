import { ApiProperty } from '@nestjs/swagger';

export class TransactionCategoryResponse {
  @ApiProperty({ example: 2, description: 'Unique identifier of the category' })
  transactionCategoryId: number;

  @ApiProperty({ example: 'Food', description: 'Name of the category' })
  name: string;
}