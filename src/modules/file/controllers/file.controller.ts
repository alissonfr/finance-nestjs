import { BadRequestException, Controller, Get, NotFoundException, Param, Request, Res, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { Response } from "express"
import { existsSync } from "fs"
import { join } from "path"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { UserRequest } from "src/shared/interfaces/user-request.interface"

@Controller("files")
@ApiTags("files")
export class FileController {
    @Get(":userId/:filename")
    @UseGuards(JwtAuthGuard)
    async getFile(
        @Param("userId") userId: string,
        @Param("filename") filename: string,
        @Res() res: Response,
        @Request() req: UserRequest,
    ) {
        if (!userId) throw new BadRequestException("Arquivo não encontrado, o caminho está incorreto.")

        if (req.user.userId.toString() !== userId) {
            throw new BadRequestException("Você não tem permissão para acessar esse arquivo.")
        }

        const filePath = join(__dirname, "..", "..", "..", "..", "uploads/internal", userId, filename)
        if (!existsSync(filePath)) {
            throw new NotFoundException("Arquivo não encontrado.")
        }
        return res.sendFile(filePath)
    }

    @Get("public/:directory/:filename")
    @UseGuards(JwtAuthGuard)
    async getPublicFile(@Param("directory") directory: string, @Param("filename") filename: string, @Res() res: Response) {
        const filePath = join(__dirname, "..", "..", "..", "..", "uploads/public", directory, filename)
        if (!existsSync(filePath)) {
            throw new NotFoundException("Arquivo não encontrado.")
        }
        return res.sendFile(filePath)
    }
}
