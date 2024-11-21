import { ApiProperty } from '@nestjs/swagger';

export class CreditCardResponse {
  @ApiProperty({ example: 3, description: 'Unique identifier of the credit card' })
  creditCardId: number;

  @ApiProperty({ example: 'My Visa', description: 'Name of the credit card' })
  name: string;

  @ApiProperty({ example: '150.00', description: 'Credit card credit limit' })
  creditLimit: string;

  @ApiProperty({ example: 'Visa', description: 'Name of the credit card' })
  brand: string;

  @ApiProperty({ example: '2023-11-09T14:30:00.000Z', description: 'Closing date of the credit card' })
  closingDate: Date;

  @ApiProperty({ example: '2023-11-09T14:30:00.000Z', description: 'Due date of the credit card' })
  dueDate: Date;
}
