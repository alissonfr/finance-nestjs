import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepositoryImpl } from './adapters/driven/account.repository.impl';
import { TransactionCategoryRepositoryImpl } from './adapters/driven/transaction-category.repository.impl';
import { TransactionRepositoryImpl } from './adapters/driven/transaction.repository.impl';
import { UserRepositoryImpl } from './adapters/driven/user.repository.impl';
import { AuthController } from './adapters/driver/auth.controller';
import { TransactionController } from './adapters/driver/transaction.controller';
import { UserController } from './adapters/driver/user.controller';
import { Account } from './domain/model/account.entity';
import { TransactionCategory } from './domain/model/transaction-category.entity';
import { Transaction } from './domain/model/transaction.entity';
import { User } from './domain/model/user.entity';
import { TransactionService } from './domain/ports/input/TransactionService';
import { UserService } from './domain/ports/input/UserService';
import { TransactionServiceImpl } from './domain/ports/input/transaction.service';
import { UserServiceImpl } from './domain/ports/input/user.service';
import { AccountRepository } from './domain/ports/output/AccountRepository';
import { TransactionCategoryRepository } from './domain/ports/output/TransactionCategoryRepository';
import { TransactionRepository } from './domain/ports/output/TransactionRepository';
import { UserRepository } from './domain/ports/output/UserRepository';
import { TransactionCategoryController } from './adapters/driver/transaction-category.controller';
import { AccountController } from './adapters/driver/account.controller';
import { TransactionCategoryService } from './domain/ports/input/TransactionCategoryService';
import { TransactionCategoryServiceImpl } from './domain/ports/input/transaction-category.service';
import { AccountService } from './domain/ports/input/AccountService';
import { AccountServiceImpl } from './domain/ports/input/account.service';
import { CreditCard } from './domain/model/credit-card.entity';
import { CreditCardController } from './adapters/driver/credit-card.controller';
import { CreditCardService } from './domain/ports/input/CreditCardService';
import { CreditCardServiceImpl } from './domain/ports/input/credit-card.service';
import { CreditCardRepository } from './domain/ports/output/CreditCardRepository';
import { CreditCardRepositoryImpl } from './adapters/driven/credit-card.repository.impl';

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
    TypeOrmModule.forFeature([User, Transaction, TransactionCategory, Account, CreditCard]),
  ],
  controllers: [UserController, TransactionController, AuthController, TransactionCategoryController, AccountController, CreditCardController],
  providers: [
    // { provide: APP_FILTER, useClass: ExceptionHandler },

    { provide: UserRepository, useClass: UserRepositoryImpl },
    { provide: UserService, useClass: UserServiceImpl },

    { provide: TransactionRepository, useClass: TransactionRepositoryImpl },
    { provide: TransactionService, useClass: TransactionServiceImpl },

    { provide: TransactionCategoryRepository, useClass: TransactionCategoryRepositoryImpl },
    { provide: TransactionCategoryService, useClass: TransactionCategoryServiceImpl },
    
    { provide: AccountRepository, useClass: AccountRepositoryImpl },
    { provide: AccountService, useClass: AccountServiceImpl },

    { provide: CreditCardRepository, useClass: CreditCardRepositoryImpl },
    { provide: CreditCardService, useClass: CreditCardServiceImpl },
  ],
})
export class AppModule {}
