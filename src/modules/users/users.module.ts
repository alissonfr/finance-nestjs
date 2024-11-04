import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryImpl } from './adapters/driven/user.repository.impl';
import { UserController } from './adapters/driver/user.controller';
import { UserServiceImpl } from './domain/ports/input/user.service';
import { UserService } from './domain/ports/input/UserService';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepositoryImpl])
  ],
  controllers: [UserController],
  providers: [
    UserServiceImpl,
    {
      provide: UserService,
      useClass: UserServiceImpl
    }
  ]
})
export class UsersModule {}
