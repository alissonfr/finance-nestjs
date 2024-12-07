import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('credit_cards')
export class CreditCard {
    @PrimaryGeneratedColumn()
    creditCardId?: number;

  @Column()
  cardName: string;

  @Column('decimal', { precision: 12, scale: 2 })
  limit: number;

  @Column('decimal', { precision: 12, scale: 2 })
  availableLimit: number;

  @Column()
  dueDate: number;

  @Column()
  closingDate: number;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  user: User;
}
