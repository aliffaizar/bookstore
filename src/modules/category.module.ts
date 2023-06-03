import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from 'src/controllers/category.controller';
import { Category } from 'src/entities/category.entity';
import { CategoryResolver } from 'src/resolvers/category.resolver';
import { CategoryService } from 'src/services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
