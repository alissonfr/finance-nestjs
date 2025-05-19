import { BadRequestException, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { User } from "src/modules/user/entities/user.entity"
import { UserService } from "src/modules/user/services/user.service"
import { AuthResponseDTO } from "../dtos/auth-response.dto"
import { LoginRequestDTO } from "../dtos/login-request.dto"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(username)

        if (!user) {
            throw new BadRequestException("Usuário não encontrado.")
        }

        const isPasswordMatching = await bcrypt.compare(pass, user.password)

        if (!isPasswordMatching) {
            throw new BadRequestException("Senha inválida.")
        }

        const { password, ...result } = user
        return result
    }

    async login(input: LoginRequestDTO): Promise<AuthResponseDTO> {
        const user = await this.userService.findByEmail(input.email)
        if (!user) {
            throw new BadRequestException("Usuário não encontrado.")
        }

        const payload = { email: user.email, sub: user.userId }
        return {
            token: this.jwtService.sign(payload, { secret: process.env.SECRET_KEY }),
            user: user,
        }
    }

    async register(user: User): Promise<AuthResponseDTO> {
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = await this.userService.create(user)
        return this.login(newUser as LoginRequestDTO)
    }
}
