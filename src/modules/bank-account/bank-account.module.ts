import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount])],
  // controllers: [BankAccountController],
  // providers: [
  //   {
  //     provide: 'BankAccountService',
  //     useClass: BankAccountServiceImpl,
  //   },
  // ],
  // exports: ['BankAccountService'],
})
export class BankAccountModule {}
