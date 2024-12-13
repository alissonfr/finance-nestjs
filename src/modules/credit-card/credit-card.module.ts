import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './entities/credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard])],
  // controllers: [CreditCardController],
  // providers: [
  //   {
  //     provide: 'CreditCardService',
  //     useClass: CreditCardServiceImpl,
  //   },
  // ],
  // exports: ['CreditCardService'],
})
export class CreditCardModule {}
