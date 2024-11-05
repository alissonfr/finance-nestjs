import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResponse } from '../model/request/user-response.dto';
import { UserRequest } from '../model/response/user-request.dto';
import { UserService } from '../../domain/ports/input/UserService';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService
  ) {}

  @Get()
  async find(): Promise<UserResponse[]> {
    return this.userService.find();
  }

  @Get(':userId')
  async findById(@Param('userId') userId: number): Promise<UserResponse> {
    return this.userService.findById(userId);
  }

  @Post()
  async save(@Body() userRequest: UserRequest): Promise<UserResponse> {
    return await this.userService.save(userRequest);
  }
}