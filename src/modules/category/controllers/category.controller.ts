import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { UserRequest } from 'src/shared/interfaces/user-request.interface';
import { Category } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';
import { Icon } from '../dtos/icon.dto';
import { Operation } from 'src/shared/enum/operation.enum';

@Controller('categories')
@ApiTags('categories')
export class CategoryController {
  constructor(
    private readonly service: CategoryService
  ) {}

  @Get("icons")
  @UseGuards(JwtAuthGuard)
  async findIcons(@Query('name') name?: string): Promise<Icon[]> {
    return this.service.findIcons({ name });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() input, 
    @Request() req: UserRequest
  ): Promise<Category> {
    return this.service.create({
      ...input,
      user: req.user
    });
  }

  @Put(':categoryId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('categoryId') categoryId: number,
    @Body() input
  ): Promise<Category> {
    return this.service.update(categoryId, input);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@Query('operation') operation?: Operation): Promise<Category[]> {
    return this.service.find({ operation });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':categoryId')
  async findOne(@Param('categoryId') categoryId: number): Promise<Category> {
    return this.service.findOne(categoryId);
  }

  @Delete(':categoryId')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('categoryId') id: number): Promise<void> {
    return this.service.delete(id);
  }
}
