import { Query, Resolver } from '@nestjs/graphql';

import { Author } from 'src/entities/author.entity';
import { AuthorService } from 'src/services/author.service';

@Resolver()
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => [Author])
  authors(): Promise<Author[]> {
    return this.authorService.findAll();
  }
}
