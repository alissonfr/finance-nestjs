import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRequest } from 'src/modules/users/adapters/model/request/user-request.dto';
import { UserResponse } from 'src/modules/users/adapters/model/response/user-response.dto';
import { UserMapper } from '../../mapper/user.mapper';
import { UserRepository } from '../output/UserRepository';
import { UserService } from './UserService';

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

  async save(userRequest: UserRequest): Promise<UserResponse> {
    const user = UserMapper.toEntity(userRequest);
    return UserMapper.toResponse(await this.userRepository.save(user));
  }

  async update(id: number, userRequest: UserRequest): Promise<UserResponse> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException('User with ID not found.');
    }
    const user = UserMapper.toEntity(userRequest);
    user.userId = id;
    return UserMapper.toResponse(await this.userRepository.save(user));
  }
}