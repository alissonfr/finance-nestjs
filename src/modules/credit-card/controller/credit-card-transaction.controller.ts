import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common"
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { CreditCardTransactionRequest } from "../dtos/credit-card-transaction-request.dto"
import { CreditCardTransaction } from "../entities/credit-card-transaction.entity"
import { CreditCardTransactionService } from "../services/credit-card-transaction.service"

@Controller("credit-card-transactions")
@ApiTags("credit-card-transactions")
export class CreditCardTransactionController {
    constructor(private readonly service: CreditCardTransactionService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CreditCardTransactionRequest })
    async create(@Body() input: CreditCardTransactionRequest): Promise<CreditCardTransaction> {
        return this.service.create(input)
    }

    @Put(":creditCardTransactionId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "creditCardTransactionId",
        type: Number,
        description: "ID da transação de cartão de crédito a ser atualizada",
    })
    @ApiBody({ type: CreditCardTransactionRequest })
    async update(
        @Param("creditCardTransactionId") creditCardTransactionId: number,
        @Body() input: CreditCardTransactionRequest,
    ): Promise<CreditCardTransaction> {
        return this.service.update(creditCardTransactionId, input)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async find(): Promise<CreditCardTransaction[]> {
        return this.service.find()
    }

    @Get(":creditCardTransactionId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "creditCardTransactionId",
        type: Number,
        description: "ID da transação de cartão de crédito",
    })
    async findOne(@Param("creditCardTransactionId") creditCardTransactionId: number): Promise<CreditCardTransaction> {
        return this.service.findOne(creditCardTransactionId)
    }

    @Delete(":creditCardTransactionId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "creditCardTransactionId",
        type: Number,
        description: "ID da transação de cartão de crédito a ser deletada",
    })
    async delete(@Param("creditCardTransactionId") id: number): Promise<void> {
        return this.service.delete(id)
    }
}
