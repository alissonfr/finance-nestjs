import { UserResponse } from "../../adapters/model/response/user-response.dto";
import { UserRequest } from "../../adapters/model/request/user-request.dto";
import { User } from "../model/user.entity";

export class UserMapper {
    static toEntity(createUserDto: UserRequest): User {
      const user = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.cpf = createUserDto.cpf;
      user.password = createUserDto.password;
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