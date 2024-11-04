import { UserResponse } from 'src/adapters/model/request/user-response.dto';
import { User } from '../../model/user.entity';
import { UserRequest } from 'src/adapters/model/response/user-request.dto';

export interface IUserService {
  find(): Promise<UserResponse[]>
  findById(id: number): Promise<UserResponse>
  save(user: User): Promise<UserRequest>
}