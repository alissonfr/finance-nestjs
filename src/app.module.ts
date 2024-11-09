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
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    { provide: APP_FILTER, useClass: ExceptionHandler },
    { provide: UserRepository, useClass: UserRepositoryImpl },
    { provide: UserService, useClass: UserServiceImpl }
  ],
})
export class AppModule {}
