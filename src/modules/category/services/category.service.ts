import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import * as Icons from "src/data/icons.json"
import { User } from "src/modules/user/entities/user.entity"
import { Operation } from "src/shared/enum/operation.enum"
import { Repository } from "typeorm"
import { CategoryRequestDTO } from "../dtos/category-request.dto"
import { Icon } from "../dtos/icon.dto"
import { Category } from "../entities/category.entity"

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>,
    ) {}

    async find(filters?: { operation?: Operation }): Promise<Category[]> {
        const categories = this.repository.createQueryBuilder()

        if (filters.operation) {
            categories.where("operation = :operation", { operation: filters.operation })
        }

        return categories.getMany()
    }

    async findOne(categoryId: number): Promise<Category> {
        const category = await this.repository.findOne({ where: { categoryId } })
        if (!category) {
            throw new BadRequestException("Categoria não encontrada")
        }
        return category
    }

    async create(input: CategoryRequestDTO, user: User): Promise<Category> {
        const category = this.repository.create({ ...input, user })
        return await this.repository.save(category)
    }

    async update(id: number, updateData: { name?: string; initialAmount?: string }): Promise<Category> {
        const category = await this.findOne(id)
        if (!category) {
            throw new NotFoundException(`Categoria não encontrada.`)
        }
        Object.assign(category, updateData)
        return this.repository.save(category)
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
    }

    async findIcons(): Promise<Icon[]> {
        const icons = Icons as Icon[]
        return icons.slice(0, 100)
    }
}
