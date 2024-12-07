// src/user/user.service.interface.ts
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

export interface UserService {
  create(input: CreateUserDto): Promise<UserResponseDto>;
  findOne(userId: number): Promise<UserResponseDto>;
}