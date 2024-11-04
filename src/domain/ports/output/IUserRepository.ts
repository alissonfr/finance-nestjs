import { User } from '../../model/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>
  findById(id: number): Promise<User>
  save(user: User): Promise<User>
}

export const IUserRepository = Symbol('IUserRepository');