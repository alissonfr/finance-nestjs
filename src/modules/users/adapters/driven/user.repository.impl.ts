import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/model/user.entity';
import { UserRepository } from '../../domain/ports/output/UserRepository';
import { SqlErrorEnum } from 'src/common/enums/sql-error.enum';

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
    return await this.repository.findOneBy({ userId });
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }
}