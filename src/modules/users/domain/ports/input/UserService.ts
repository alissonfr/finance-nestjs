import { UserResponse } from 'src/modules/users/adapters/model/request/user-response.dto';
import { User } from '../../model/user.entity';

export interface UserService {
  find(): Promise<UserResponse[]>
  findById(id: number): Promise<UserResponse>
  save(user: User): Promise<UserResponse>
}

export const UserService = Symbol('UserService');