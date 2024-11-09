import { UserRequest } from "src/adapters/model/request/user-request.dto";
import { UserResponse } from "src/adapters/model/response/user-response.dto";

export interface UserService {
  find(): Promise<UserResponse[]>
  findById(userId: number): Promise<UserResponse>
  save(user: UserRequest): Promise<UserResponse>
  update(userId: number, userRequest: UserRequest): Promise<UserResponse>
}

export const UserService = Symbol('UserService');