import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/domain/ports/output/IUserRepository';
import { User } from 'src/domain/model/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
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