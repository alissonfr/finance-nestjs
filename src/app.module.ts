import { Module } from '@nestjs/common';
import { UserController } from './adapters/driver/user.controller';
import { UserService } from './domain/ports/input/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfrastructureModule } from './infra/infrastructure.module';

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
      synchronize: true, // Não use em produção
    }),
    InfrastructureModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
  ],
})
export class AppModule {}
