import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

import { Category } from 'src/entities/category.entity';
import { CategoryService } from 'src/services/category.service';

@SkipThrottle()
@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
