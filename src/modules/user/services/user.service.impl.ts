import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: User): Promise<User> {
    const user = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

}
