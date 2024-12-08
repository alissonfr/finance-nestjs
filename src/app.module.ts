import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

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
    UserModule
  ],
  providers: [],
})
export class AppModule {}
