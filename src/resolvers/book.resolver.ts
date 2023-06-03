import { Query, Resolver } from '@nestjs/graphql';
import { Book } from 'src/entities/book.entity';
import { BookService } from 'src/services/book.service';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  books(): Promise<Book[]> {
    return this.bookService.findAll();
  }
}
