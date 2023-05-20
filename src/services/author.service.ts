import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from 'src/entities/author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from 'src/dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    const authors = await this.authorRepository.find();
    return authors;
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  async createAuthor(authorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = await this.authorRepository.save(authorDto);
    return newAuthor;
  }

  async update(id: number, authorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorRepository.update(id, authorDto);
    if (author.affected === 0) {
      throw new NotFoundException('Author not found');
    }
    return await this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const author = await this.authorRepository.delete(id);
    if (author.affected === 0) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }
}
