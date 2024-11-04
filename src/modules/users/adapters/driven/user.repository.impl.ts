import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/model/user.entity';
import { UserRepository } from '../../domain/ports/output/UserRepository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findById(userId: number): Promise<User> {
    return this.repository.findOneBy({ userId });
  }

  save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}