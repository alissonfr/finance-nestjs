import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { BankAccountModule } from './modules/bank-account/bank-account.module'
import { CreditCardModule } from './modules/credit-card/credit-card.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { CategoryModule } from './modules/category/category.module'
import { PaymentMethodModule } from './modules/payment-method/category.module'
import { ReportModule } from './modules/report/report.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    BankAccountModule,
    CreditCardModule,
    AuthModule,
    CategoryModule,
    PaymentMethodModule,
    ReportModule,
  ],
  providers: [],
})
export class AppModule {}
