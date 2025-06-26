import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/modules/user/entities/user.entity"

export class AuthResponseDTO {
    @ApiProperty()
    token: string

    @ApiProperty({ type: () => User })
    user: User
}
