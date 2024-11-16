import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequest } from '../model/request/login-request.dto';
import { LoginResponse } from '../model/response/login-response.dto';
import { UserService } from 'src/domain/ports/input/UserService';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UserService) private readonly userService: UserService
  ) {}

  @Post("login")
  async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    return {
      token: "123",
      user: await this.userService.findByEmail(request.email)
    };
  }
}
