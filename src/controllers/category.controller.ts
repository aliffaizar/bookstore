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
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';

import { CategoryDto } from 'src/dto/category.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CategoryService } from 'src/services/category.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return await this.categoryService.findAll();
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async createCategory(@Body() categoryDto: CategoryDto) {
    return await this.categoryService.createCategory(categoryDto);
  }

  @Get(':id')
  async getCategory(@Param('id') id: number) {
    return await this.categoryService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ) {
    return await this.categoryService.update(id, categoryDto);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async removeCategory(@Param('id') id: number) {
    return await this.categoryService.remove(id);
  }
}
