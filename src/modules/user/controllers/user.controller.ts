import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject('UserService')
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
