import { Category } from "src/modules/category/entities/category.entity"
import { TransactionType } from "src/shared/enum/transaction-type.enum"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { CreditCard } from "./credit-card.entity"

@Entity("credit_card_transaction")
export class CreditCardTransaction {
    @PrimaryGeneratedColumn({ name: "credit_card_transaction_id" })
    creditCardTransactionId: number

    @Column()
    description: string

    @Column()
    date: Date

    @Column({ name: "fin_transaction_id" })
    finTransactionId: string

    @Column()
    notes: string

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    amount: number

    @Column({ type: "enum", enum: TransactionType })
    type: TransactionType

    @ManyToOne(() => Category, category => category.transactions)
    @JoinColumn({ name: "category_id" })
    category: Category

    @ManyToOne(() => CreditCard, creditCard => creditCard.transactions)
    @JoinColumn({ name: "credit_card_id" })
    creditCard: CreditCard
}
