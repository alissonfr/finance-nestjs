import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { uuidv7 } from "uuidv7"
import { CreditCardTransactionRequest } from "../dtos/credit-card-transaction-request.dto"
import { CreditCardTransaction } from "../entities/credit-card-transaction.entity"

@Injectable()
export class CreditCardTransactionService {
    constructor(
        @InjectRepository(CreditCardTransaction)
        private readonly repository: Repository<CreditCardTransaction>,
    ) {}

    async find(): Promise<CreditCardTransaction[]> {
        const creditCards = this.repository.createQueryBuilder("creditCard").leftJoinAndSelect("creditCard.category", "category")

        return creditCards.getMany()
    }

    async findOne(creditCardTransactionId: number): Promise<CreditCardTransaction> {
        const creditCard = await this.repository.findOne({ where: { creditCardTransactionId } })
        if (!creditCard) {
            throw new BadRequestException("Transação de cartão de crédito não encontrada")
        }
        return creditCard
    }

    async create(input: CreditCardTransactionRequest): Promise<CreditCardTransaction> {
        const FIN_TRANSACTION_ID = uuidv7()

        const creditCard = this.repository.create({ ...input, finTransactionId: FIN_TRANSACTION_ID })
        return await this.repository.save(creditCard)
    }

    async update(id: number, updateData: CreditCardTransactionRequest): Promise<CreditCardTransaction> {
        const creditCard = await this.findOne(id)
        if (!creditCard) {
            throw new NotFoundException(`Transação de cartão de crédito não encontrada.`)
        }
        Object.assign(creditCard, updateData)
        return this.repository.save(creditCard)
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
    }
}
