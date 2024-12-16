import { IncomingMessage } from "node:http";
import { User } from "src/modules/user/entities/user.entity";

export interface UserRequest extends IncomingMessage {
    user: User
  }