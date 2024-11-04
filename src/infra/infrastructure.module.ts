import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/adapters/driven/user.repository';
import { User } from 'src/domain/model/user.entity';
import { IUserRepository } from 'src/domain/ports/output/IUserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [UserRepository],
})
export class InfrastructureModule {}
