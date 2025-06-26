import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common"
import { ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { UserRequest } from "src/shared/interfaces/user-request.interface"
import { BankAccountRequest } from "../dtos/bank-account-request.dto"
import { BankAccountResponse } from "../dtos/bank-account-response.dto"
import { BankAccount } from "../entities/bank-account.entity"
import { BankAccountService } from "../services/bank-account.service"

@Controller("bank-accounts")
@ApiTags("bank-accounts")
export class BankAccountController {
    constructor(private readonly service: BankAccountService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() input: BankAccountRequest, @Request() req: UserRequest): Promise<BankAccount> {
        return this.service.create(input, req.user)
    }

    @Put(":bankAccountId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "bankAccountId",
        type: Number,
        description: "ID da conta bancária a ser atualizada",
    })
    async update(@Param("bankAccountId") bankAccountId: number, @Body() input: BankAccountRequest): Promise<BankAccount> {
        return this.service.update(bankAccountId, input)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiQuery({
        name: "name",
        required: false,
        description: "Filtrar contas pelo nome",
        example: "Nubank",
    })
    async find(@Query("name") name?: string): Promise<BankAccountResponse[]> {
        return this.service.find({ name })
    }

    @Get(":bankAccountId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "bankAccountId",
        type: Number,
        description: "ID da conta bancária a ser buscada",
    })
    async findOne(@Param("bankAccountId") bankAccountId: number): Promise<BankAccount> {
        return this.service.findOne(bankAccountId)
    }

    @Delete(":bankAccountId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "bankAccountId",
        type: Number,
        description: "ID da conta bancária a ser deletada",
    })
    async delete(@Param("bankAccountId") id: number): Promise<void> {
        return this.service.delete(id)
    }
}
