import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Inject, Put} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserService } from '../../domain/ports/input/UserService';
import { UserResponse } from '../model/response/user-response.dto';
import { UserRequest } from '../model/request/user-request.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Users retrieved successfully', type: [UserResponse] })
  async find(): Promise<UserResponse[]> {
    return this.userService.find();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user to retrieve' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User retrieved successfully', type: UserResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND,  description: 'User not found' })
  async findById(@Param('userId') userId: number): Promise<UserResponse> {
    return this.userService.findById(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created successfully', type: UserResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async save(@Body() userRequest: UserRequest): Promise<UserResponse> {
    return await this.userService.save(userRequest);
  }

  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user to update' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated successfully', type: UserResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async update(@Param('userId') userId: number, @Body() userRequest: UserRequest): Promise<UserResponse> {
    return this.userService.update(userId, userRequest);
  }
}
