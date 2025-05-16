import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { DeleteTransactionOptions } from "src/shared/enum/delete-transaction-options.enum"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { BankAccountTransactionResponseDTO } from "../dtos/bank-account-transaction-response.dto"
import { BankAccountTransaction } from "../entities/bank-account-transaction.entity"
import { BankAccountTransactionService } from "../services/bank-account-transaction.service"

@Controller("bank-account-transactions")
@ApiTags("bank-account-transactions")
export class BankAccountTransactionController {
    constructor(private readonly service: BankAccountTransactionService) {}

    @Put(":bankAccountTransactionId/status")
    @UseGuards(JwtAuthGuard)
    async updateStatus(@Param("bankAccountTransactionId") bankAccountTransactionId: number): Promise<BankAccountTransaction> {
        return this.service.updateStatus(bankAccountTransactionId)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() input): Promise<void> {
        return this.service.create(input)
    }

    @Put(":bankAccountTransactionId")
    @UseGuards(JwtAuthGuard)
    async update(
        @Param("bankAccountTransactionId") bankAccountTransactionId: number,
        @Body() input,
    ): Promise<BankAccountTransaction> {
        return this.service.update(bankAccountTransactionId, input)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async find(
        @Query("search") search?: string,
        @Query("sort") sort?: string,
        @Query("month") month?: string,
        @Query("year") year?: string,
    ): Promise<BankAccountTransactionResponseDTO[]> {
        return this.service.find({ search, sort, month, year })
    }

    @UseGuards(JwtAuthGuard)
    @Get(":bankAccountTransactionId")
    async findOne(@Param("bankAccountTransactionId") bankAccountTransactionId: number): Promise<BankAccountTransaction> {
        return this.service.findOne(bankAccountTransactionId)
    }

    @Delete(":bankAccountTransactionId")
    @UseGuards(JwtAuthGuard)
    async delete(
        @Param("bankAccountTransactionId") id: number,
        @Query("option") option?: DeleteTransactionOptions,
    ): Promise<void> {
        return this.service.delete(id, option)
    }
}
