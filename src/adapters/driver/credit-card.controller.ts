import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreditCardService } from 'src/domain/ports/input/CreditCardService';
import { CreditCardResponse } from '../model/response/credit-card-response.dto';

@ApiTags('Credit card')
@Controller('credit-card')
export class CreditCardController {
  constructor(
    @Inject(CreditCardService) private readonly creditCardService: CreditCardService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all credit cards' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Credit cards retrieved successfully', type: [CreditCardResponse] })
  async find(): Promise<CreditCardResponse[]> {
    return this.creditCardService.find();
  }
}