import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Entity('credit_card')
export class CreditCard {
  @PrimaryGeneratedColumn({ name: 'credit_card_id' })
  creditCardId?: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', name: 'credit_limit' })
  creditLimit: string;

  @Column()
  brand: string;

  @Column({ name: 'closing_date' })
  closingDate: Date;

  @Column({ name: 'due_date' })
  dueDate: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.creditCard)
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
