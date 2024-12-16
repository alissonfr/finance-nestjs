import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(data: User): Promise<User> {
    const user = this.repository.create(data);
    return await this.repository.save(user);
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.repository.findOne({ where: { userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

}
