import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserMapper } from '../../mapper/user.mapper';
import { UserRepository } from '../output/UserRepository';
import { UserService } from './UserService';
import { UserResponse } from 'src/adapters/model/response/user-response.dto';
import { UserRequest } from 'src/adapters/model/request/user-request.dto';
import { User } from 'src/domain/model/user.entity';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async find(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => UserMapper.toResponse(user));
  }

  async findById(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    return UserMapper.toResponse(user);
  }

  async save(request: UserRequest): Promise<UserResponse> {
    return UserMapper.toResponse(await this.userRepository.save({ ...request }));
  }

  async update(id: number, request: UserRequest): Promise<UserResponse> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User with ID not found.');
    }
    return UserMapper.toResponse(await this.userRepository.save({ userId: id, ...request }));
  }
}