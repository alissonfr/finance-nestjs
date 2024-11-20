import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionCategoryResponse } from '../model/response/transaction-category-response.dto';
import { TransactionCategoryService } from 'src/domain/ports/input/TransactionCategoryService';

@ApiTags('TransactionCategory')
@Controller('transaction-category')
export class TransactionCategoryController {
  constructor(
    @Inject(TransactionCategoryService) private readonly transactionCategoryService: TransactionCategoryService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all transaction categories' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Transaction categories retrieved successfully', type: [TransactionCategoryResponse] })
  async find(): Promise<TransactionCategoryResponse[]> {
    return this.transactionCategoryService.find();
  }
}