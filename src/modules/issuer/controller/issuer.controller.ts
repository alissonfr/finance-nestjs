import { Controller, Get, Param, Query } from "@nestjs/common"
import { ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger"
import { Issuer } from "../entities/issuer.entity"
import { IssuerService } from "../service/issuer.service"

@Controller("issuers")
@ApiTags("issuers")
export class IssuerController {
    constructor(private readonly issuerService: IssuerService) {}

    @Get()
    @ApiQuery({
        name: "name",
        required: false,
        description: "Filtra emissores pelo nome",
        example: "Banco do Brasil",
    })
    find(@Query("name") name?: string): Promise<Issuer[]> {
        return this.issuerService.find(name)
    }

    @Get(":id")
    @ApiParam({
        name: "id",
        type: Number,
        description: "ID do emissor a ser buscado",
        example: 123,
    })
    findOne(@Param("id") id: number): Promise<Issuer> {
        return this.issuerService.findOne(id)
    }
}
