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
import { IssuerModule } from "./modules/issuer/issuer.module"
import { dbOptions } from "./database/data-source"

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
        }),
        TypeOrmModule.forRoot(dbOptions),
        UserModule,
        BankAccountModule,
        CreditCardModule,
        AuthModule,
        CategoryModule,
        PaymentMethodModule,
        ReportModule,
        FileModule,
        IssuerModule
    ],
    providers: [],
})
export class AppModule {}
