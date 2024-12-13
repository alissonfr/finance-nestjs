import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreditCardBill } from './credit-card-bill.entity';

@Entity('credit_card')
export class CreditCard {
  @PrimaryGeneratedColumn({ name: "credit_card_id" })
  creditCardId?: number;

  @Column()
  name: string;

  @Column({ name: "credit_limit" })
  creditLimit: number;

  @Column({ name: "due_day" })
  dueDay: number;

  @Column({ name: "closing_day" })
  closingDay: number;

  @ManyToOne(() => User, user => user.bankAccounts)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => CreditCardBill, transaction => transaction.creditCard)
  bills: CreditCardBill[];
}