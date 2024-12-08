import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(user);
    return this.toResponseDto(savedUser);
  }

  async findOne(userId: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.toResponseDto(user);
  }

  private toResponseDto(user: User): UserResponseDto {
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
    };
  }
}
