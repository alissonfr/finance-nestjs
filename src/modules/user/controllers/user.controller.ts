import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { UserRequestDTO } from "../dtos/user-request.dto"
import { User } from "../entities/user.entity"
import { UserService } from "../services/user.service"

@Controller("users")
@ApiTags("users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiBody({ type: UserRequestDTO })
    async create(@Body() input: UserRequestDTO): Promise<User> {
        return this.userService.create(input)
    }

    @Get(":userId")
    @ApiParam({
        name: "userId",
        type: Number,
        description: "ID do usuário",
        example: 123,
    })
    async findOne(@Param("userId") userId: number): Promise<User> {
        return this.userService.findOne(userId)
    }
}
