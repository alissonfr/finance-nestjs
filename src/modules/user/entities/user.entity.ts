import { BankAccount } from 'src/modules/bank-account/entities/bank-account.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { CreditCard } from 'src/modules/credit-card/entities/credit-card.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId?: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  password: string;

  @OneToMany(() => Category, category => category.user)
  categories: Category[];

  @OneToMany(() => BankAccount, bankAccount => bankAccount.user)
  bankAccounts: BankAccount[];

  @OneToMany(() => CreditCard, bankAccount => bankAccount.user)
  creditCards: CreditCard[];
}