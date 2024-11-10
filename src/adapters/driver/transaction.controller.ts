import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Inject, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { TransactionService } from '../../domain/ports/input/TransactionService';
import { TransactionResponse } from '../model/response/transaction-response.dto';
import { TransactionRequest } from '../model/request/transaction-request.dto';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(TransactionService) private readonly transactionService: TransactionService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all transactions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Transactions retrieved successfully', type: [TransactionResponse] })
  async findAll(): Promise<TransactionResponse[]> {
    return this.transactionService.find();
  }

  @Get(':transactionId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a transaction by ID' })
  @ApiParam({ name: 'transactionId', type: Number, description: 'ID of the transaction to retrieve' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Transaction retrieved successfully', type: TransactionResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Transaction not found' })
  async findById(@Param('transactionId') transactionId: number): Promise<TransactionResponse> {
    return this.transactionService.findById(transactionId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Transaction created successfully', type: TransactionResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async create(@Body() transactionRequest: TransactionRequest): Promise<TransactionResponse> {
    return await this.transactionService.save(transactionRequest);
  }

  @Put(':transactionId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing transaction' })
  @ApiParam({ name: 'transactionId', type: Number, description: 'ID of the transaction to update' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Transaction updated successfully', type: TransactionResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Transaction not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async update(@Param('transactionId') transactionId: number, @Body() transactionRequest: TransactionRequest): Promise<TransactionResponse> {
    return this.transactionService.update(transactionId, transactionRequest);
  }
}