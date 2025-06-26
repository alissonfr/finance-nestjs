import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common"
import { ApiBody, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger"
import { DeleteTransactionOptions } from "src/shared/enum/delete-transaction-options.enum"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { BankAccountTransactionRequestDTO } from "../dtos/bank-account-transaction-request.dto"
import { BankAccountTransactionResponseDTO } from "../dtos/bank-account-transaction-response.dto"
import { BankAccountTransaction } from "../entities/bank-account-transaction.entity"
import { BankAccountTransactionService } from "../services/bank-account-transaction.service"

@Controller("bank-account-transactions")
@ApiTags("bank-account-transactions")
export class BankAccountTransactionController {
    constructor(private readonly service: BankAccountTransactionService) {}

    @Put(":bankAccountTransactionId/status")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "bankAccountTransactionId",
        type: Number,
        description: "ID da transação da conta bancária",
    })
    async updateStatus(@Param("bankAccountTransactionId") id: number): Promise<BankAccountTransaction> {
        return this.service.updateStatus(id)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: BankAccountTransactionRequestDTO })
    async create(@Body() input: BankAccountTransactionRequestDTO): Promise<void> {
        this.service.create(input)
    }

    @Put(":bankAccountTransactionId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "bankAccountTransactionId",
        type: Number,
        description: "ID da transação a ser atualizada",
    })
    @ApiBody({ type: BankAccountTransactionRequestDTO })
    async update(
        @Param("bankAccountTransactionId") bankAccountTransactionId: number,
        @Body() input: BankAccountTransactionRequestDTO,
    ): Promise<BankAccountTransaction> {
        return this.service.update(bankAccountTransactionId, { ...input })
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiQuery({ name: "search", required: false, description: "Texto de busca" })
    @ApiQuery({ name: "sort", required: false, description: "Ordenação" })
    @ApiQuery({ name: "month", required: false, description: "Mês (MM)" })
    @ApiQuery({ name: "year", required: false, description: "Ano (YYYY)" })
    async find(
        @Query("search") search?: string,
        @Query("sort") sort?: string,
        @Query("month") month?: string,
        @Query("year") year?: string,
    ): Promise<BankAccountTransactionResponseDTO[]> {
        return this.service.find({ search, sort, month, year })
    }

    @Get(":bankAccountTransactionId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "bankAccountTransactionId",
        type: Number,
        description: "ID da transação a ser buscada",
    })
    async findOne(@Param("bankAccountTransactionId") bankAccountTransactionId: number): Promise<BankAccountTransaction> {
        return this.service.findOne(bankAccountTransactionId)
    }

    @Delete(":bankAccountTransactionId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "bankAccountTransactionId",
        type: Number,
        description: "ID da transação a ser deletada",
    })
    @ApiQuery({
        name: "option",
        enum: DeleteTransactionOptions,
        required: false,
        description: "Opção de exclusão (SOFT ou HARD)",
    })
    async delete(
        @Param("bankAccountTransactionId") id: number,
        @Query("option") option?: DeleteTransactionOptions,
    ): Promise<void> {
        return this.service.delete(id, option)
    }
}
