import { DeepPartial } from 'typeorm';
import { User } from '../../model/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: number): Promise<User>
  save(user: DeepPartial<User>): Promise<User>
  findByEmail(email: string): Promise<User>
}

export const UserRepository = Symbol('UserRepository');