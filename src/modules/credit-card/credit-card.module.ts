import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './entities/credit-card.entity';
import { CreditCardController } from './controller/credit-card.controller';
import { CreditCardService } from './services/credit-card.service';
import { CreditCardTransactionController } from './controller/credit-card-transaction.controller';
import { CreditCardTransaction } from './entities/credit-card-transaction.entity';
import { CreditCardTransactionService } from './services/credit-card-transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard, CreditCardTransaction])],
  controllers: [CreditCardController, CreditCardTransactionController],
  providers: [CreditCardService, CreditCardTransactionService],
})
export class CreditCardModule {}
