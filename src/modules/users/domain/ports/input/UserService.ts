import { UserResponse } from 'src/modules/users/adapters/model/response/user-response.dto';
import { User } from '../../model/user.entity';
import { UserRequest } from 'src/modules/users/adapters/model/request/user-request.dto';

export interface UserService {
  find(): Promise<UserResponse[]>
  findById(userId: number): Promise<UserResponse>
  save(user: UserRequest): Promise<UserResponse>
  update(userId: number, userRequest: UserRequest): Promise<UserResponse>
}

export const UserService = Symbol('UserService');