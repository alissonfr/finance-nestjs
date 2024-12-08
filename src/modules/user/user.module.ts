import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserServiceImpl } from './services/user.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserService',
      useClass: UserServiceImpl,
    },
  ],
  exports: ['UserService'],
})
export class UserModule {}
