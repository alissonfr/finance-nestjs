import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "./modules/auth/auth.module"
import { BankAccountModule } from "./modules/bank-account/bank-account.module"
import { CategoryModule } from "./modules/category/category.module"
import { CreditCardModule } from "./modules/credit-card/credit-card.module"
import { FileModule } from "./modules/file/file.module"
import { PaymentMethodModule } from "./modules/payment-method/category.module"
import { ReportModule } from "./modules/report/report.module"
import { UserModule } from "./modules/user/user.module"

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 5432),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
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
        FileModule,
    ],
    providers: [],
})
export class AppModule {}
