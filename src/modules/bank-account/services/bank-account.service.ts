import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/modules/user/entities/user.entity"
import { Operation } from "src/shared/enum/operation.enum"
import { Repository } from "typeorm"
import { BankAccountRequest } from "../dtos/bank-account-request.dto"
import { BankAccountResponse } from "../dtos/bank-account-response.dto"
import { BankAccount } from "../entities/bank-account.entity"

@Injectable()
export class BankAccountService {
    constructor(
        @InjectRepository(BankAccount)
        private readonly repository: Repository<BankAccount>,
    ) {}

    async find(filters?: { name?: string }): Promise<BankAccountResponse[]> {
        const queryBuilder = this.repository
            .createQueryBuilder("bankAccount")
            .leftJoinAndSelect("bankAccount.transactions", "transaction")
            .leftJoinAndSelect("bankAccount.user", "user")
            .select([
                "bankAccount.bankAccountId",
                "bankAccount.name",
                "bankAccount.initialAmount",
                "user",
                `SUM(CASE WHEN transaction.operation = '${Operation.INCOME}' THEN transaction.amount ELSE -transaction.amount END) as totalAmount`,
            ])
            .groupBy("bankAccount.bankAccountId, user.userId")

        if (filters.name) {
            queryBuilder.where("bankAccount.name ILIKE :name", { name: `%${filters.name}%` })
        }

        const results = await queryBuilder.getRawAndEntities()

        return results.entities.map((result, index) => ({
            bankAccountId: result.bankAccountId,
            name: result.name,
            initialAmount: result.initialAmount,
            totalAmount: results.raw[index].totalamount,
            user: result.user,
        }))
    }

    async findOne(bankAccountId: number): Promise<BankAccount> {
        const account = await this.repository.findOne({ where: { bankAccountId } })
        if (!account) {
            throw new BadRequestException("Conta bancária não encontrada.")
        }
        return account
    }

    async create(input: BankAccountRequest, user: User): Promise<BankAccount> {
        const account = this.repository.create({ ...input, user })
        return await this.repository.save(account)
    }

    async update(id: number, updateData: BankAccountRequest): Promise<BankAccount> {
        const bankAccount = await this.findOne(id)
        if (!bankAccount) {
            throw new NotFoundException("Conta bancária não encontrada.")
        }
        Object.assign(bankAccount, updateData)
        return this.repository.save(bankAccount)
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
    }
}
