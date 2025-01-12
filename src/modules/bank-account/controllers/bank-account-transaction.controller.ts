import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import { UserRequest } from 'src/shared/interfaces/user-request.interface'
import { BankAccountTransaction } from '../entities/bank-account-transaction.entity'
import { BankAccountTransactionService } from '../services/bank-account-transaction.service'

@Controller('bank-account-transactions')
@ApiTags('bank-account-transactions')
export class BankAccountTransactionController {
  constructor(private readonly service: BankAccountTransactionService) {}

  @Put(':bankAccountTransactionId/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('bankAccountTransactionId') bankAccountTransactionId: number,
  ): Promise<BankAccountTransaction> {
    return this.service.updateStatus(bankAccountTransactionId)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() input,
    @Request() req: UserRequest,
  ): Promise<BankAccountTransaction> {
    return this.service.create({ ...input, user: req.user })
  }

  @Put(':bankAccountTransactionId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('bankAccountTransactionId') bankAccountTransactionId: number,
    @Body() input,
  ): Promise<BankAccountTransaction> {
    return this.service.update(bankAccountTransactionId, input)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@Query('name') name?: string): Promise<BankAccountTransaction[]> {
    return this.service.find({ name })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':bankAccountTransactionId')
  async findOne(
    @Param('bankAccountTransactionId') bankAccountTransactionId: number,
  ): Promise<BankAccountTransaction> {
    return this.service.findOne(bankAccountTransactionId)
  }

  @Delete(':bankAccountTransactionId')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('bankAccountTransactionId') id: number): Promise<void> {
    return this.service.delete(id)
  }
}
