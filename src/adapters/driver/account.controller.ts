import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from 'src/domain/ports/input/AccountService';
import { AccountResponse } from '../model/response/account-response.dto';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(
    @Inject(AccountService) private readonly accountService: AccountService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all accounts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Accounts retrieved successfully', type: [AccountResponse] })
  async find(): Promise<AccountResponse[]> {
    return this.accountService.find();
  }
}