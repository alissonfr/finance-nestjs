import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/adapters/driven/user.repository';
import { UserResponse } from 'src/adapters/model/request/user-response.dto';
import { UserRequest } from 'src/adapters/model/response/user-request.dto';
import { UserMapper } from 'src/domain/mapper/user.mapper';
import { IUserService } from './IUserService';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

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