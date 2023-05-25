import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCategoryApi,
  DeleteCategoryApi,
  GetCategoriesApi,
  GetCategoryApi,
  UpdateCategoryApi,
} from 'src/decorators/docs/category.api';
import { Roles } from 'src/decorators/roles.decorator';

import { CategoryDto } from 'src/dto/category.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CategoryService } from 'src/services/category.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @GetCategoriesApi()
  @Get()
  async getCategories() {
    return await this.categoryService.findAll();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @CreateCategoryApi()
  @Post()
  async createCategory(@Body() categoryDto: CategoryDto) {
    return await this.categoryService.createCategory(categoryDto);
  }

  @GetCategoryApi()
  @Get(':id')
  async getCategory(@Param('id') id: number) {
    return await this.categoryService.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @UpdateCategoryApi()
  @Patch(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ) {
    return await this.categoryService.update(id, categoryDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @DeleteCategoryApi()
  @Delete(':id')
  async removeCategory(@Param('id') id: number) {
    return await this.categoryService.remove(id);
  }
}
