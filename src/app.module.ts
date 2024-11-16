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
  controllers: [UserController, TransactionController, AuthController],
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
