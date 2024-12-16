import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() input: User): Promise<User> {
    return this.userService.create(input);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('userId') userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
}
