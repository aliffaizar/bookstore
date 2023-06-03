import { Query, Resolver } from '@nestjs/graphql';

import { Category } from 'src/entities/category.entity';
import { CategoryService } from 'src/services/category.service';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
