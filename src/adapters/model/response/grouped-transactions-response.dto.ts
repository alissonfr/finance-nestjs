import { ApiProperty } from '@nestjs/swagger';
import { AccountResponse } from './account-response.dto';
import { CreditCardResponse } from './credit-card-response.dto';
import { TransactionResponse } from './transaction-response.dto';

export class GroupedAccount {
  @ApiProperty({
    description: 'Account associated with the transactions',
    type: AccountResponse
  })
  account: AccountResponse;

  @ApiProperty({
    description: 'List of transactions for this account',
    type: [TransactionResponse]
  })
  transactions: TransactionResponse[];
}

export class GroupedCreditCard {
  @ApiProperty({
    description: 'Credit card associated with the transactions',
    type: CreditCardResponse
  })
  creditCard: CreditCardResponse;

  @ApiProperty({
    description: 'List of transactions for this credit card',
    type: [TransactionResponse]
  })
  transactions: TransactionResponse[];
}

export class GroupedTransactionsResponse {
  @ApiProperty({
    description: 'List of accounts with their associated transactions',
    type: [GroupedAccount]
  })
  accounts: GroupedAccount[];

  @ApiProperty({
    description: 'List of credit cards with their associated transactions',
    type: [GroupedCreditCard]
  })
  creditCards: GroupedCreditCard[];
}

