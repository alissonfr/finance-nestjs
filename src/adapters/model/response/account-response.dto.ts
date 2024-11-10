import { ApiProperty } from '@nestjs/swagger';

export class AccountResponse {
  @ApiProperty({ example: 3, description: 'Unique identifier of the account' })
  accountId: number;

  @ApiProperty({ example: 'Personal Account', description: 'Name of the account' })
  name: string;

  @ApiProperty({ example: '150.00', description: 'Account initial amount' })
  initialAmount: string;
}
