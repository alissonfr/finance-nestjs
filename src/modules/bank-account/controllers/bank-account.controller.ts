import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import { UserRequest } from 'src/shared/interfaces/user-request.interface'
import { BankAccount } from '../entities/bank-account.entity'
import { BankAccountService } from '../services/bank-account.service'
import { BankAccountResponse } from '../dtos/bank-account-response.dto'

@Controller('bank-accounts')
@ApiTags('bank-accounts')
export class BankAccountController {
  constructor(private readonly service: BankAccountService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() input: { name: string; initialAmount: number },
    @Request() req: UserRequest,
  ): Promise<BankAccount> {
    return this.service.create({
      ...input,
      user: req.user,
    })
  }

  @Put(':bankAccountId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('bankAccountId') bankAccountId: number,
    @Body() input: { name?: string; initialAmount?: string },
  ): Promise<BankAccount> {
    return this.service.update(bankAccountId, input)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@Query('name') name?: string): Promise<BankAccountResponse[]> {
    return this.service.find({ name })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':bankAccountId')
  async findOne(@Param('bankAccountId') bankAccountId: number): Promise<BankAccount> {
    return this.service.findOne(bankAccountId)
  }

  @Delete(':bankAccountId')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('bankAccountId') id: number): Promise<void> {
    return this.service.delete(id)
  }
}
