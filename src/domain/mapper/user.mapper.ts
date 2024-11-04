import { UserRequest } from "src/adapters/model/response/user-request.dto";
import { User } from "../model/user.entity";
import { UserResponse } from "src/adapters/model/request/user-response.dto";

export class UserMapper {
    static toEntity(createUserDto: UserRequest): User {
      const user = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.cpf = createUserDto.cpf;
      return user;
    }
  
    static toResponse(user: User): UserResponse {
      const userResponse = new UserResponse();
      userResponse.userId = user.userId;
      userResponse.name = user.name;
      userResponse.email = user.email;
      userResponse.cpf = user.cpf;
      return userResponse;
    }
  }