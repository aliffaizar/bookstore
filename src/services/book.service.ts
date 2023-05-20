import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from 'src/entities/book.entity';
import { CreateBookDto, UpdateBookDto } from 'src/dto/book.dto';
import { Author } from 'src/entities/author.entity';
import { Publisher } from 'src/entities/publisher.entity';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookRepository.find();
    return books;
  }

  private async findPublisher(id: number): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne({
      where: { id },
    });
    if (!publisher) {
      throw new BadRequestException('Invalid publisherId');
    }
    return publisher;
  }

  private async findAuthor(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new BadRequestException('Invalid authorId');
    }
    return author;
  }

  private async findCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new BadRequestException('Invalid categoryId');
    }
    return category;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { authorId, publisherId, categoryId, ...bookData } = createBookDto;

    const author = await this.findAuthor(authorId);
    const publisher = await this.findPublisher(publisherId);
    const category = await this.findCategory(categoryId);

    const book = await this.bookRepository.save({
      ...bookData,
      author,
      publisher,
      category,
    });
    return book;
  }

  private async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`book with id ${id} not found`);
    }
    return book;
  }

  async findOneWithRelations(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'publisher', 'category'],
    });
    if (!book) {
      throw new NotFoundException(`book with id ${id} not found`);
    }
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
