import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  async create(@Body() input: User): Promise<User> {
    return this.userService.create(input);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
}
