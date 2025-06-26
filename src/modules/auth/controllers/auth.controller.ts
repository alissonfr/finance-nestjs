import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common"
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { LocalAuthGuard } from "src/shared/guards/local-auth.guard"
import { RegisterRequestDTO } from "../dtos/request/register-request.dto"
import { AuthResponseDTO } from "../dtos/response/auth-response.dto"
import { AuthService } from "../services/auth.service"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @UseGuards(LocalAuthGuard)
    @ApiOkResponse({ type: AuthResponseDTO })
    async login(@Request() req): Promise<AuthResponseDTO> {
        return this.authService.login(req.user)
    }

    @Post("register")
    @ApiBody({ type: RegisterRequestDTO })
    @ApiCreatedResponse({ type: AuthResponseDTO })
    async register(@Body() user: RegisterRequestDTO): Promise<AuthResponseDTO> {
        return this.authService.register(user)
    }
}
