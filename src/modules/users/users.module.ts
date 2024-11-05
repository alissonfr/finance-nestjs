import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryImpl } from './adapters/driven/user.repository.impl';
import { UserController } from './adapters/driver/user.controller';
import { UserServiceImpl } from './domain/ports/input/user.service';
import { UserService } from './domain/ports/input/UserService';
import { UserRepository } from './domain/ports/output/UserRepository';
import { User } from './domain/model/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl
    },
    {
      provide: UserService,
      useClass: UserServiceImpl
    }
  ]
})
export class UsersModule {}
