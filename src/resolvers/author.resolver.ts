import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

import { Author } from 'src/entities/author.entity';
import { AuthorService } from 'src/services/author.service';

@SkipThrottle()
@Resolver()
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => [Author])
  authors(): Promise<Author[]> {
    return this.authorService.findAll();
  }
}
