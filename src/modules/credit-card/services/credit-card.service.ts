import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreditCard } from "../entities/credit-card.entity"
import { CreditCardResponse } from "../dtos/credit-card-response.dto"
import { CreditCardWithTransaction } from "../dtos/credit-card-with-transaction.dto"

@Injectable()
export class CreditCardService {
    constructor(
        @InjectRepository(CreditCard)
        private readonly repository: Repository<CreditCard>,
    ) {}

    async findWithTransactions({ month, year }): Promise<CreditCardWithTransaction[]> {
        const queryBuilder = this.repository.createQueryBuilder("creditCard")
            .leftJoinAndSelect("creditCard.transactions", "transaction")
            .leftJoinAndSelect("creditCard.user", "user")
            .andWhere("EXTRACT(YEAR FROM transaction.date) = :year", { year })
            .andWhere("EXTRACT(MONTH FROM transaction.date) = :month", { month })
            .addSelect(qb => {
                return qb
                    .select("SUM(transaction.amount)", "totalAmount")
                    .from("credit_card_transaction", "transaction")
                    .where("transaction.credit_card_id = creditCard.credit_card_id")
                    .andWhere("EXTRACT(YEAR FROM transaction.date) = :year", { year })
                    .andWhere("EXTRACT(MONTH FROM transaction.date) = :month", { month });
            }, "totalAmount");
    
        const result = await queryBuilder.getRawAndEntities();

        console.log(result)
    
        return result.entities.map(creditCard => ({
            creditCardId: creditCard.creditCardId,
            name: creditCard.name,
            user: creditCard.user,
            transactions: creditCard.transactions,
            totalAmount: result.raw[0].totalAmount ?? "0.00",
            dueDate: new Date(`${year}-${month}-${creditCard.dueDay}`).toISOString(),
            closingDate: new Date(`${year}-${month}-${creditCard.closingDay}`).toISOString(),
        })) as unknown as CreditCardWithTransaction[];
    }
    

    async find(filters?: { name?: string }): Promise<CreditCardResponse[]> {
        const queryBuilder = this.repository
            .createQueryBuilder("creditCard")
            .leftJoinAndSelect("creditCard.user", "user");

        if (filters.name) {
            queryBuilder.where("creditCard.name ILIKE :name", { name: `%${filters.name}%` })
        }

        const results = await queryBuilder.getRawAndEntities()

        return results.entities.map((result) => ({
            creditCardId: result.creditCardId,
            name: result.name,
            creditLimit: result.creditLimit,
            dueDay: result.dueDay,
            closingDay: result.closingDay,
            user: result.user,
        }))
    }

    async findOne(creditCardId: number): Promise<CreditCard> {
        const account = await this.repository.findOne({ where: { creditCardId } })
        if (!account) {
            throw new BadRequestException("Conta bancária não encontrada.")
        }
        return account
    }

    async create(input: CreditCard): Promise<CreditCard> {
        const account = this.repository.create(input)
        return await this.repository.save(account)
    }

    async update(id: number, updateData: { name: string, creditLimit: number, dueDay: number, closingDay: number }): Promise<CreditCard> {
        const creditCard = await this.findOne(id)
        if (!creditCard) {
            throw new NotFoundException("Conta bancária não encontrada.")
        }
        Object.assign(creditCard, updateData)
        return this.repository.save(creditCard)
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
    }
}
