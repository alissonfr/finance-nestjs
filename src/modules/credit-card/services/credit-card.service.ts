import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/modules/user/entities/user.entity"
import { Repository } from "typeorm"
import { CreditCardRequest } from "../dtos/credit-card-request.dto"
import { CreditCardResponse } from "../dtos/credit-card-response.dto"
import { CreditCardWithTransaction } from "../dtos/credit-card-with-transaction.dto"
import { CreditCard } from "../entities/credit-card.entity"

@Injectable()
export class CreditCardService {
    constructor(
        @InjectRepository(CreditCard)
        private readonly repository: Repository<CreditCard>,
    ) {}

    async findWithTransactions({ month, year }): Promise<CreditCardWithTransaction[]> {
        const queryBuilder = this.repository
            .createQueryBuilder("creditCard")
            .leftJoinAndSelect("creditCard.issuer", "issuer")
            .leftJoinAndSelect(
                "creditCard.transactions",
                "transaction",
                "EXTRACT(YEAR FROM transaction.date) = :year AND EXTRACT(MONTH FROM transaction.date) = :month",
                { year, month },
            )
            .leftJoinAndSelect("transaction.category", "category")
            .leftJoinAndSelect("creditCard.user", "user")
            .addSelect(qb => {
                return qb
                    .select("SUM(transaction.amount)", "totalAmount")
                    .from("credit_card_transaction", "transaction")
                    .where("transaction.credit_card_id = creditCard.credit_card_id")
                    .andWhere("EXTRACT(YEAR FROM transaction.date) = :year", { year })
                    .andWhere("EXTRACT(MONTH FROM transaction.date) = :month", { month })
            }, "totalAmount")

        const result = await queryBuilder.getRawAndEntities()

        console.log(result)

        return result.entities.map((creditCard, index) => ({
            creditCardId: creditCard.creditCardId,
            name: creditCard.name,
            user: creditCard.user,
            issuer: creditCard.issuer,
            transactions: creditCard.transactions,
            totalAmount: result.raw[index]?.totalAmount ?? "0.00",
            dueDate: new Date(`${year}-${month}-${creditCard.dueDay}`).toISOString(),
            closingDate: new Date(`${year}-${month}-${creditCard.closingDay}`).toISOString(),
        })) as unknown as CreditCardWithTransaction[]
    }

    async find(filters?: { name?: string }): Promise<CreditCardResponse[]> {
        const queryBuilder = this.repository
            .createQueryBuilder("creditCard")
            .leftJoinAndSelect("creditCard.issuer", "issuer")
            .leftJoinAndSelect("creditCard.user", "user")

        if (filters.name) {
            queryBuilder.where("creditCard.name ILIKE :name", { name: `%${filters.name}%` })
        }

        return await queryBuilder.getMany()
    }

    async findOne(creditCardId: number): Promise<CreditCard> {
        const account = await this.repository.findOne({ where: { creditCardId } })
        if (!account) {
            throw new BadRequestException("Conta bancária não encontrada.")
        }
        return account
    }

    async create(input: CreditCardRequest, user: User): Promise<CreditCard> {
        const account = this.repository.create({ ...input, user })
        return await this.repository.save(account)
    }

    async update(id: number, updateData: CreditCardRequest): Promise<CreditCard> {
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
