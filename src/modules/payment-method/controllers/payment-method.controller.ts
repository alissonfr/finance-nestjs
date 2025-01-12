import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import { PaymentMethod } from '../entities/payment-method.entity'
import { PaymentMethodService } from '../services/category.service'

@Controller('payment-methods')
@ApiTags('payment-methods')
export class PaymentMethodController {
  constructor(private readonly service: PaymentMethodService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@Query('name') name?: string): Promise<PaymentMethod[]> {
    return this.service.find({ name })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':categoryId')
  async findOne(
    @Param('categoryId') categoryId: number,
  ): Promise<PaymentMethod> {
    return this.service.findOne(categoryId)
  }
}
