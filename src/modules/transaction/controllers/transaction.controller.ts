import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../entities/transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject('TransactionService')
    private readonly transactionService: TransactionService
  ) {}

  @Post()
  async create(@Body() input: Transaction): Promise<Transaction> {
    return this.transactionService.create(input);
  }

  @Get(':transactionId')
  async findOne(@Param('transactionId') transactionId: number): Promise<Transaction> {
    return this.transactionService.findOne(transactionId);
  }
}
