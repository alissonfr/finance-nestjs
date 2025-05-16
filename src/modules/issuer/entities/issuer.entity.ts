import { CreditCard } from 'src/modules/credit-card/entities/credit-card.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum InstitutionType {
  BANK_ACCOUNT = 'BANK_ACCOUNT',
  CREDIT_CARD = 'CREDIT_CARD',
  ALL = 'ALL',
}

@Entity('issuers')
export class Issuer {
  @PrimaryGeneratedColumn({ name: 'issuer_id' })
  issuerId: number;

  @Column()
  name: string;

  @Column({ name: "logo_url" })
  logoUrl: string;

  @Column({ name: "key_word" })
  keyWord: string;

  @Column({ type: 'int' })
  popularity: number;

  @Column()
  color: string;

  @Column({ name: 'institution_type', type: 'enum', enum: InstitutionType })
  institutionType: InstitutionType;

  @OneToMany(() => CreditCard, bankAccount => bankAccount.issuer)
  creditCards: CreditCard[];
}
