import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }
}