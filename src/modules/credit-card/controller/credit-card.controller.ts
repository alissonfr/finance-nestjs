import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common"
import { ApiBody, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { UserRequest } from "src/shared/interfaces/user-request.interface"
import { CreditCardRequest } from "../dtos/credit-card-request.dto"
import { CreditCardResponse } from "../dtos/credit-card-response.dto"
import { CreditCardWithTransaction } from "../dtos/credit-card-with-transaction.dto"
import { CreditCard } from "../entities/credit-card.entity"
import { CreditCardService } from "../services/credit-card.service"

@Controller("credit-cards")
@ApiTags("credit-cards")
export class CreditCardController {
    constructor(private readonly service: CreditCardService) {}

    @Get("transactions")
    @UseGuards(JwtAuthGuard)
    @ApiQuery({
        name: "month",
        required: false,
        description: "Mês das transações (MM)",
        example: "06",
    })
    @ApiQuery({
        name: "year",
        required: false,
        description: "Ano das transações (YYYY)",
        example: "2025",
    })
    async findWithTransactions(
        @Query("month") month?: string,
        @Query("year") year?: string,
    ): Promise<CreditCardWithTransaction[]> {
        return this.service.findWithTransactions({ month, year })
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CreditCardRequest })
    async create(@Body() input: CreditCardRequest, @Request() req: UserRequest): Promise<CreditCard> {
        return this.service.create(input, req.user)
    }

    @Put(":creditCardId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "creditCardId",
        type: Number,
        description: "ID do cartão de crédito a ser atualizado",
    })
    @ApiBody({ type: CreditCardRequest })
    async update(@Param("creditCardId") creditCardId: number, @Body() input: CreditCardRequest): Promise<CreditCard> {
        return this.service.update(creditCardId, input)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiQuery({
        name: "name",
        required: false,
        description: "Filtrar cartões pelo nome",
        example: "Visa Platinum",
    })
    async find(@Query("name") name?: string): Promise<CreditCardResponse[]> {
        return this.service.find({ name })
    }

    @Get(":creditCardId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "creditCardId",
        type: Number,
        description: "ID do cartão de crédito a ser buscado",
    })
    async findOne(@Param("creditCardId") creditCardId: number): Promise<CreditCard> {
        return this.service.findOne(creditCardId)
    }

    @Delete(":creditCardId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "creditCardId",
        type: Number,
        description: "ID do cartão de crédito a ser deletado",
    })
    async delete(@Param("creditCardId") id: number): Promise<void> {
        return this.service.delete(id)
    }
}
