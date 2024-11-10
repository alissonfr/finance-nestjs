import { UserResponse } from "../../adapters/model/response/user-response.dto";
import { User } from "../model/user.entity";

export class UserMapper {

    static toResponse(user: User): UserResponse {
      const userResponse = new UserResponse();
      userResponse.userId = user.userId;
      userResponse.name = user.name;
      userResponse.email = user.email;
      userResponse.cpf = user.cpf;
      return userResponse;
    }
  }