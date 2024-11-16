import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../../domain/model/user.entity';
import { UserRepository } from '../../domain/ports/output/UserRepository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findById(userId: number): Promise<User> {
    return await this.repository.findOneByOrFail({ userId });
  }

  async save(user: DeepPartial<User>): Promise<User> {
    const newUser = this.repository.create(user);
    return await this.repository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOneByOrFail({ email });
  }
}