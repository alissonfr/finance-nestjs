import { User } from "src/modules/user/entities/user.entity";

export class AuthResponseDTO {
    token: string;
    user: User
}