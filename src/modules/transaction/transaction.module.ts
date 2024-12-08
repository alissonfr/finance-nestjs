import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'typeorm';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionServiceImpl } from './services/transaction.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionController],
  providers: [
    {
      provide: 'TransactionService',
      useClass: TransactionServiceImpl,
    },
  ],
  exports: ['TransactionService'],
})
export class TransactionModule {}
