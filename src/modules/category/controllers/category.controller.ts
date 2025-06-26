import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common"
import { ApiBody, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger"
import { Operation } from "src/shared/enum/operation.enum"
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard"
import { UserRequest } from "src/shared/interfaces/user-request.interface"
import { CategoryRequestDTO } from "../dtos/category-request.dto"
import { Icon } from "../dtos/icon.dto"
import { Category } from "../entities/category.entity"
import { CategoryService } from "../services/category.service"

@Controller("categories")
@ApiTags("categories")
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @Get("icons")
    @UseGuards(JwtAuthGuard)
    async findIcons(): Promise<Icon[]> {
        return this.service.findIcons()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CategoryRequestDTO })
    async create(@Body() input: CategoryRequestDTO, @Request() req: UserRequest): Promise<Category> {
        return this.service.create(input, req.user)
    }

    @Put(":categoryId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "categoryId",
        type: Number,
        description: "ID da categoria a ser atualizada",
    })
    @ApiBody({ type: CategoryRequestDTO })
    async update(@Param("categoryId") categoryId: number, @Body() input: CategoryRequestDTO): Promise<Category> {
        return this.service.update(categoryId, input)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiQuery({
        name: "operation",
        enum: Operation,
        required: false,
        description: "Descrição da operação (INCOME ou EXPENSE)",
    })
    async find(@Query("operation") operation?: Operation): Promise<Category[]> {
        return this.service.find({ operation })
    }

    @Get(":categoryId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "categoryId",
        type: Number,
        description: "ID da categoria a ser buscada",
    })
    async findOne(@Param("categoryId") categoryId: number): Promise<Category> {
        return this.service.findOne(categoryId)
    }

    @Delete(":categoryId")
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        name: "categoryId",
        type: Number,
        description: "ID da categoria a ser deletada",
    })
    async delete(@Param("categoryId") id: number): Promise<void> {
        return this.service.delete(id)
    }
}
