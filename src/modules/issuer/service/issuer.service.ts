import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Raw, Repository } from "typeorm"
import { Issuer } from "../entities/issuer.entity"

@Injectable()
export class IssuerService {
    constructor(
        @InjectRepository(Issuer)
        private readonly repository: Repository<Issuer>,
    ) {}

    async find(name?: string): Promise<Issuer[]> {
        const whereClause = name
            ? [
                  { name: Raw(alias => `LOWER(${alias}) LIKE LOWER(:name)`, { name: `%${name}%` }) },
                  { keyWord: Raw(alias => `LOWER(${alias}) LIKE LOWER(:name)`, { name: `%${name}%` }) },
              ]
            : {}

        return this.repository.find({
            where: whereClause,
            order: { popularity: "ASC" },
        })
    }

    async findOne(issuerId: number): Promise<Issuer | null> {
        return this.repository.findOne({ where: { issuerId } })
    }
}
