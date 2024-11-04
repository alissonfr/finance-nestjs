import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserRequest } from '../model/response/user-request.dto';
import { User } from '../../domain/model/user.entity';
import { UserService } from '../../domain/ports/input/user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserResponse } from '../model/request/user-response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async find(): Promise<UserResponse[]> {
    return this.userService.find();
  }

  @Get(':userId')
  async findById(@Param('userId') userId: number): Promise<UserResponse> {
    return this.userService.findById(userId);
  }

  @Post()
  async ave(@Body() userRequest: UserRequest): Promise<UserResponse> {
    return await this.userService.save(userRequest);
  }
}