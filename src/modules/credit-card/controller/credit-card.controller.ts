import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import { UserRequest } from 'src/shared/interfaces/user-request.interface'
import { CreditCard } from '../entities/credit-card.entity'
import { CreditCardService } from '../services/credit-card.service'
import { CreditCardResponse } from '../dtos/credit-card-response.dto'
import { CreditCardWithTransaction } from '../dtos/credit-card-with-transaction.dto'

@Controller('credit-cards')
@ApiTags('credit-cards')
export class CreditCardController {
  constructor(private readonly service: CreditCardService) {}

  @Get('transactions')
  @UseGuards(JwtAuthGuard)
  async findWithTransactions(@Query("month") month?: string, @Query("year") year?: string,): Promise<CreditCardWithTransaction[]> {
    return this.service.findWithTransactions({ month, year })
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() input: CreditCard,
    @Request() req: UserRequest,
  ): Promise<CreditCard> {
    return this.service.create({ ...input, user: req.user })
  }

  @Put(':creditCardId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('creditCardId') creditCardId: number,
    @Body() input: { name: string, creditLimit: number, dueDay: number, closingDay: number },
  ): Promise<CreditCard> {
    return this.service.update(creditCardId, input)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@Query('name') name?: string): Promise<CreditCardResponse[]> {
    return this.service.find({ name })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':creditCardId')
  async findOne(@Param('creditCardId') creditCardId: number): Promise<CreditCard> {
    return this.service.findOne(creditCardId)
  }

  @Delete(':creditCardId')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('creditCardId') id: number): Promise<void> {
    return this.service.delete(id)
  }
}
