import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionResponseDto } from '../dto/transaction-response.dto';
import { TransactionService } from '../services/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<TransactionResponseDto> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get(':transactionId')
  async findOne(@Param('transactionId') transactionId: number): Promise<TransactionResponseDto> {
    return this.transactionService.findOne(transactionId);
  }
}
