import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { UserRequest } from "src/shared/interfaces/user-request.interface"
import { CreditCardTransaction } from "../entities/credit-card-transaction.entity"
import { CreditCardTransactionService } from "../services/credit-card-transaction.service"

@Controller("credit-card-transactions")
@ApiTags("credit-card-transactions")
export class CreditCardTransactionController {
    constructor(private readonly service: CreditCardTransactionService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() input, @Request() req: UserRequest): Promise<CreditCardTransaction> {
        return this.service.create({
            ...input,
            user: req.user,
        })
    }

    @Put(":creditCardTransactionId")
    @UseGuards(JwtAuthGuard)
    async update(@Param("creditCardTransactionId") creditCardTransactionId: number, @Body() input): Promise<CreditCardTransaction> {
        return this.service.update(creditCardTransactionId, input)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async find(): Promise<CreditCardTransaction[]> {
        return this.service.find()
    }

    @UseGuards(JwtAuthGuard)
    @Get(":creditCardTransactionId")
    async findOne(@Param("creditCardTransactionId") creditCardTransactionId: number): Promise<CreditCardTransaction> {
        return this.service.findOne(creditCardTransactionId)
    }

    @Delete(":creditCardTransactionId")
    @UseGuards(JwtAuthGuard)
    async delete(@Param("creditCardTransactionId") id: number): Promise<void> {
        return this.service.delete(id)
    }
}
