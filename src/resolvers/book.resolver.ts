import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

import { Book } from 'src/entities/book.entity';
import { BookService } from 'src/services/book.service';

@SkipThrottle()
@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  books(): Promise<Book[]> {
    return this.bookService.findAll();
  }
}
