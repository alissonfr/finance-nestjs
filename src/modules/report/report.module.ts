import { Module } from '@nestjs/common';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountTransaction } from '../bank-account/entities/bank-account-transaction.entity';
import { BankAccount } from '../bank-account/entities/bank-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount, BankAccountTransaction])],
  controllers: [ReportController,],
  providers: [ReportService],
})
export class ReportModule {}
