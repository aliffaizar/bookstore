import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateBookDto, UpdateBookDto } from 'src/dto/book.dto';
import { BookService } from 'src/services/book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks() {
    return await this.bookService.findAll();
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.createBook(createBookDto);
  }

  @Get(':id')
  async getBook(@Param('id') id: number) {
    return await this.bookService.findOneWithRelations(id);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  async removeBook(@Param('id') id: number) {
    return await this.bookService.remove(id);
  }
}
