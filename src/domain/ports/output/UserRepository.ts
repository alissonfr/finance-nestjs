import { User } from '../../model/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: number): Promise<User>
  save(user: User): Promise<User>
}

export const UserRepository = Symbol('UserRepository');