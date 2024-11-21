import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCardRepository } from '../../domain/ports/output/CreditCardRepository';
import { CreditCard } from 'src/domain/model/credit-card.entity';

@Injectable()
export class CreditCardRepositoryImpl implements CreditCardRepository {
  constructor(
    @InjectRepository(CreditCard)
    private readonly repository: Repository<CreditCard>,
  ) {}

  async findAll(): Promise<CreditCard[]> {
    return await this.repository.find();
  }

  async findById(creditCardId: number): Promise<CreditCard> {
    return await this.repository.findOneByOrFail({ creditCardId });
  }

  async save(creditCard: CreditCard): Promise<CreditCard> {
    return await this.repository.save(creditCard);
  }
}