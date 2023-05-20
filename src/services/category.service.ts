import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/dto/category.dto';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async createCategory(categoryDto: CategoryDto): Promise<Category> {
    const category = await this.categoryRepository.save(categoryDto);
    return category;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, categoryDto: CategoryDto): Promise<Category> {
    const category = await this.categoryRepository.update(id, categoryDto);
    if (category.affected === 0) {
      throw new NotFoundException('Category not found');
    }
    return await this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const category = await this.categoryRepository.delete(id);
    if (category.affected === 0) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
}
