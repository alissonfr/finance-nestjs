import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { BankAccount } from "src/modules/bank-account/entities/bank-account.entity"
import { Category } from "src/modules/category/entities/category.entity"
import { Operation } from "src/shared/enum/operation.enum"
import { Repository } from "typeorm"
import { UserRequestDTO } from "../dtos/user-request.dto"
import { User } from "../entities/user.entity"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(BankAccount)
        private readonly bankAccountRepository: Repository<BankAccount>,
    ) {}

    async create(data: UserRequestDTO): Promise<User> {
        const user = await this.repository.save(this.repository.create(data))
        this.categoryRepository.save(this.getInitialCategories(user))
        this.bankAccountRepository.save(this.getInitialBankAccount(user))
        return user
    }

    async findOne(userId: number): Promise<User> {
        const user = await this.repository.findOne({ where: { userId } })
        if (!user) throw new BadRequestException("Usuário não encontrado.")

        return user
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: { email } })
        if (!user) throw new BadRequestException("Usuário não encontrado.")

        return user
    }

    private getInitialBankAccount(user: User): Partial<BankAccount> {
        return {
            name: "Carteira",
            user,
        }
    }

    private getInitialCategories(user: User): Partial<Category>[] {
        return [
            { name: "Moradia", color: "#ef4444", icon: "home", operation: Operation.EXPENSE, user },
            { name: "Transporte", color: "#f97316", icon: "directions_car", operation: Operation.EXPENSE, user },
            { name: "Alimentação", color: "#f59e0b", icon: "restaurant", operation: Operation.EXPENSE, user },
            { name: "Saúde", color: "#eab308", icon: "health_and_safety", operation: Operation.EXPENSE, user },
            { name: "Educação", color: "#84cc16", icon: "school", operation: Operation.EXPENSE, user },
            { name: "Lazer", color: "#22c55e", icon: "sports_esports", operation: Operation.EXPENSE, user },
            { name: "Roupas e Acessórios", color: "#10b981", icon: "checkroom", operation: Operation.EXPENSE, user },
            { name: "Eletrônicos", color: "#14b8a6", icon: "devices", operation: Operation.EXPENSE, user },
            { name: "Presentes e Doações", color: "#06b6d4", icon: "card_giftcard", operation: Operation.EXPENSE, user },
            { name: "Pets", color: "#0ea5e9", icon: "pets", operation: Operation.EXPENSE, user },
            { name: "Beleza e Cuidados Pessoais", color: "#3b82f6", icon: "spa", operation: Operation.EXPENSE, user },
            {
                name: "Emergências e Despesas Não Planejadas",
                color: "#6366f1",
                icon: "warning",
                operation: Operation.EXPENSE,
                user,
            },
            { name: "Viagens", color: "#8b5cf6", icon: "flight", operation: Operation.EXPENSE, user },
            { name: "Assinaturas", color: "#a855f7", icon: "subscriptions", operation: Operation.EXPENSE, user },
            { name: "Serviços", color: "#d946ef", icon: "handyman", operation: Operation.EXPENSE, user },
            { name: "Entretenimento", color: "#ec4899", icon: "theaters", operation: Operation.EXPENSE, user },
            { name: "Diversos", color: "#f43f5e", icon: "category", operation: Operation.EXPENSE, user },
            { name: "Investimentos", color: "#ef4444", icon: "trending_up", operation: Operation.EXPENSE, user },
            { name: "Salário", color: "#f97316", icon: "attach_money", operation: Operation.INCOME, user },
            { name: "Empréstimos", color: "#f59e0b", icon: "account_balance", operation: Operation.INCOME, user },
            { name: "Rendimentos", color: "#eab308", icon: "savings", operation: Operation.INCOME, user },
            { name: "Outros", color: "#84cc16", icon: "more_horiz", operation: Operation.INCOME, user },
        ]
    }
}
