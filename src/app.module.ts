import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryImpl } from './adapters/driven/user.repository.impl';
import { UserController } from './adapters/driver/user.controller';
import { User } from './domain/model/user.entity';
import { UserService } from './domain/ports/input/UserService';
import { UserServiceImpl } from './domain/ports/input/user.service';
import { UserRepository } from './domain/ports/output/UserRepository';
import { ExceptionHandler } from './shared/exceptions/exception-handler';
import { TransactionRepository } from './domain/ports/output/TransactionRepository';
import { TransactionService } from './domain/ports/input/TransactionService';
import { TransactionRepositoryImpl } from './adapters/driven/transaction.repository.impl';
import { TransactionServiceImpl } from './domain/ports/input/transaction.service';
import { TransactionCategoryRepository } from './domain/ports/output/TransactionCategoryRepository';
import { TransactionCategoryRepositoryImpl } from './adapters/driven/transaction-category.repository.impl';
import { AccountRepository } from './domain/ports/output/AccountRepository';
import { AccountRepositoryImpl } from './adapters/driven/account.repository.impl';
import { Transaction } from './domain/model/transaction.entity';
import { TransactionCategory } from './domain/model/transaction-category.entity';
import { Account } from './domain/model/account.entity';
import { TransactionController } from './adapters/driver/transaction.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'finance',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Transaction, TransactionCategory, Account]),
  ],
  controllers: [UserController, TransactionController],
  providers: [
    // { provide: APP_FILTER, useClass: ExceptionHandler },

    { provide: UserRepository, useClass: UserRepositoryImpl },
    { provide: UserService, useClass: UserServiceImpl },

    { provide: TransactionRepository, useClass: TransactionRepositoryImpl },
    { provide: TransactionService, useClass: TransactionServiceImpl },

    { provide: TransactionCategoryRepository, useClass: TransactionCategoryRepositoryImpl },
    
    { provide: AccountRepository, useClass: AccountRepositoryImpl },
  ],
})
export class AppModule {}
