import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { UserRequest } from 'src/shared/interfaces/user-request.interface';
import { BankAccount } from '../entities/bank-account.entity';
import { BankAccountService } from '../services/bank-account.service';

@Controller('bank-accounts')
@ApiTags('bank-accounts')
export class BankAccountController {
  constructor(
    private readonly bankAccountService: BankAccountService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() input: { name: string, initialAmount: string }, @Request() req: UserRequest): Promise<BankAccount> {
    return this.bankAccountService.create({
      ...input,
      user: req.user
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(): Promise<BankAccount[]> {
    return this.bankAccountService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':bankAccountId')
  async findOne(@Param('bankAccountId') bankAccountId: number): Promise<BankAccount> {
    return this.bankAccountService.findOne(bankAccountId);
  }
}
