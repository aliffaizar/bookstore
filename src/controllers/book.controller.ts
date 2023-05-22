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

import { CreateBookDto, UpdateBookDto } from 'src/dto/book.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { BookService } from 'src/services/book.service';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks() {
    return await this.bookService.findAll();
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async createBook(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.createBook(createBookDto);
  }

  @Get(':id')
  async getBook(@Param('id') id: number) {
    return await this.bookService.findOneWithRelations(id);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async updateBook(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.bookService.update(id, updateBookDto);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async removeBook(@Param('id') id: number) {
    return await this.bookService.remove(id);
  }
}
