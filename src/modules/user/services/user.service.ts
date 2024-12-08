import { User } from "../entities/user.entity";

export interface UserService {
  create(input: User): Promise<User>;
  findOne(userId: number): Promise<User>;
}