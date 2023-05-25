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
  CreateBookApi,
  DeleteBookApi,
  GetBookApi,
  GetBooksApi,
  UpdateBookApi,
} from 'src/decorators/docs/book.api';
import { Roles } from 'src/decorators/roles.decorator';

import { CreateBookDto, UpdateBookDto } from 'src/dto/book.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { BookService } from 'src/services/book.service';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @GetBooksApi()
  @Get()
  async getBooks() {
    return await this.bookService.findAll();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @CreateBookApi()
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.createBook(createBookDto);
  }

  @GetBookApi()
  @Get(':id')
  async getBook(@Param('id') id: number) {
    return await this.bookService.findOneWithRelations(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @UpdateBookApi()
  @Patch(':id')
  async updateBook(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.bookService.update(id, updateBookDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @DeleteBookApi()
  @Delete(':id')
  async removeBook(@Param('id') id: number) {
    return await this.bookService.remove(id);
  }
}
