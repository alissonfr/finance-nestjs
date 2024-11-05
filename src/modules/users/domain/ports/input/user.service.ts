import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../output/UserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './UserService';
import { UserResponse } from 'src/modules/users/adapters/model/request/user-response.dto';
import { UserRepositoryImpl } from 'src/modules/users/adapters/driven/user.repository.impl';
import { UserRequest } from 'src/modules/users/adapters/model/response/user-request.dto';
import { UserMapper } from '../../mapper/user.mapper';

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
}