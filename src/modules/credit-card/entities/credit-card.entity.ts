import { User } from "src/modules/user/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CreditCardTransaction } from "./credit-card-transaction.entity"
import { Issuer } from "src/modules/issuer/entities/issuer.entity"

@Entity("credit_card")
export class CreditCard {
    @PrimaryGeneratedColumn({ name: "credit_card_id" })
    creditCardId?: number

    @Column()
    name: string

    @Column({ name: "credit_limit", type: 'decimal', precision: 10, scale: 2, default: 0, }) 
    creditLimit: number

    @Column({ name: "due_day" })
    dueDay: number

    @Column({ name: "closing_day" })
    closingDay: number

    @ManyToOne(() => User, user => user.creditCards)
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(() => Issuer, issuer => issuer.creditCards)
    @JoinColumn({ name: "issuer_id" })
    issuer: Issuer

    @OneToMany(() => CreditCardTransaction, transaction => transaction.creditCard, { cascade: true })
    transactions: CreditCardTransaction[]
}
