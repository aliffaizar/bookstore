import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CategoryDto } from 'src/dto/category.dto';
import { CategoryService } from 'src/services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return await this.categoryService.findAll();
  }

  @Post()
  async createCategory(@Body() categoryDto: CategoryDto) {
    return await this.categoryService.createCategory(categoryDto);
  }

  @Get(':id')
  async getCategory(@Param('id') id: number) {
    return await this.categoryService.findOne(id);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ) {
    return await this.categoryService.update(id, categoryDto);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: number) {
    return await this.categoryService.remove(id);
  }
}
