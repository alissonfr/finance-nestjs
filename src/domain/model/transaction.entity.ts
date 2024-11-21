import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { TransactionCategory } from './transaction-category.entity';
import { Account } from './account.entity';
import { User } from './user.entity';
import { CreditCard } from './credit-card.entity';
import { TransactionType } from '../enums/transaction-type.enum';
import { BadRequestException } from '@nestjs/common';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
  transactionId?: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column('decimal', { precision: 18, scale: 2 })
  amount: string;

  @ManyToOne(() => TransactionCategory, (category) => category.transactions)
  @JoinColumn({ name: 'transaction_category_id' })
  category: TransactionCategory;

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => CreditCard, (creditCard) => creditCard.transactions)
  @JoinColumn({ name: 'credit_card_id' })
  creditCard: CreditCard;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  validateTransaction() {
    if (this.type === TransactionType.CREDIT_CARD) {
      if (!this.creditCard) throw new BadRequestException('Credit card information is required for CREDIT_CARD transactions.');
      if (this.account) throw new BadRequestException('Account should not be provided for CREDIT_CARD transactions.');
    } 
    if (this.type === TransactionType.ACCOUNT) {
      if (!this.account) throw new BadRequestException('Account information is required for ACCOUNT transactions.');
      if (this.creditCard) throw new BadRequestException('Credit card should not be provided for ACCOUNT transactions.');
    }
  }
}
