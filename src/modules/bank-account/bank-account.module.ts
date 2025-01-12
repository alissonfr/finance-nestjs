import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { BankAccountController } from './controllers/bank-account.controller';
import { BankAccountService } from './services/bank-account.service';
import { BankAccountTransactionController } from './controllers/bank-account-transaction.controller';
import { BankAccountTransaction } from './entities/bank-account-transaction.entity';
import { BankAccountTransactionService } from './services/bank-account-transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount, BankAccountTransaction])],
  controllers: [BankAccountController, BankAccountTransactionController],
  providers: [BankAccountService, BankAccountTransactionService],
})
export class BankAccountModule {}
