import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookController } from 'src/controllers/book.controller';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';
import { Category } from 'src/entities/category.entity';
import { Publisher } from 'src/entities/publisher.entity';
import { BookResolver } from 'src/resolvers/book.resolver';
import { BookService } from 'src/services/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book, Category, Publisher])],
  controllers: [BookController],
  providers: [BookService, BookResolver],
})
export class BookModule {}
