import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from 'src/entities/book.entity';
import { CreateBookDto, UpdateBookDto } from 'src/dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookRepository.find();
    return books;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.bookRepository.save(createBookDto);
    return book;
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.update(id, updateBookDto);
    if (book.affected === 0) {
      throw new NotFoundException('Book not found');
    }
    return await this.findOne(id);
  }

  async remove(id: number): Promise<unknown> {
    const book = await this.bookRepository.delete(id);
    if (book.affected === 0) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }
}
