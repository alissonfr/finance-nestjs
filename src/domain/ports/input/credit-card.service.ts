import { Inject, Injectable } from '@nestjs/common';
import { CreditCardRepository } from '../output/CreditCardRepository';
import { CreditCardService } from './CreditCardService';
import { CreditCardResponse } from 'src/adapters/model/response/credit-card-response.dto';
import { CreditCardMapper } from 'src/domain/mapper/credit-card.mapper';

@Injectable()
export class CreditCardServiceImpl implements CreditCardService {
  constructor(
    @Inject(CreditCardRepository)
    private readonly creditCardRepository: CreditCardRepository,
  ) {}

  async find(): Promise<CreditCardResponse[]> {
    const accounts = await this.creditCardRepository.findAll();
    return accounts.map(account => CreditCardMapper.toResponse(account));
  }
}