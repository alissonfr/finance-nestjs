import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BankAccount } from "../bank-account/entities/bank-account.entity"
import { Category } from "../category/entities/category.entity"
import { UserController } from "./controllers/user.controller"
import { User } from "./entities/user.entity"
import { UserService } from "./services/user.service"

@Module({
  imports: [TypeOrmModule.forFeature([User, Category, BankAccount])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
