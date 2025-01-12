import { BankAccountTransaction } from 'src/modules/bank-account/entities/bank-account-transaction.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Operation } from 'src/shared/enum/operation.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({ name: "category_id" })
  categoryId?: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  icon: string;

  @Column({ type: 'enum', enum: Operation })
  operation: Operation;

  @ManyToOne(() => User, user => user.categories)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => BankAccountTransaction, transaction => transaction.category)
  transactions: BankAccountTransaction[];
}