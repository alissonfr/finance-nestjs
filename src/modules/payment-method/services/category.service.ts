import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from '../entities/payment-method.entity';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly repository: Repository<PaymentMethod>,
  ) {}

  async find(filters?: { name?: string }): Promise<PaymentMethod[]> {
    const categories = this.repository.createQueryBuilder();

    if(filters.name) {
      categories.orWhere('name ILIKE :name', { name: `%${filters.name}%` });
    }

    return categories.getMany();
  }

  async findOne(paymentMethodId: number): Promise<PaymentMethod> {
    const category = await this.repository.findOne({ where: { paymentMethodId } });
    if (!category) {
      throw new BadRequestException('Payment method not found');
    }
    return category;
  }
    
}