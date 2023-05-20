import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
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
    try {
      return await this.bookService.createBook(createBookDto);
    } catch (error: any) {
      if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
        const { sqlMessage } = error;
        const field = sqlMessage.split(' ')[1];
        throw new BadRequestException(`Invalid ${field.replace(/'/g, '')}`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Get(':id')
  async getBook(@Param() id: number) {
    return await this.bookService.findOne(id);
  }

  @Patch(':id')
  async updateBook(@Param() id: number, @Body() updateBookDto: UpdateBookDto) {
    return await this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  async removeBook(@Param() id: number) {
    return await this.bookService.remove(id);
  }
}
