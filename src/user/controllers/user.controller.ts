import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject('UserService')
    private readonly userService: UserService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: number): Promise<UserResponseDto> {
    return this.userService.findOne(userId);
  }
}
