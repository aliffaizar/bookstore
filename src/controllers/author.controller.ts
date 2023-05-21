import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AuthorService } from 'src/services/author.service';
import { CreateAuthorDto, UpdateAuthorDto } from 'src/dto/author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAuthors() {
    return await this.authorService.findAll();
  }

  @Get(':id')
  async getAuthor(@Param('id') id: number) {
    return await this.authorService.findOne(id);
  }

  @Post()
  async createAuthor(@Body() authorDto: CreateAuthorDto) {
    return await this.authorService.createAuthor(authorDto);
  }

  @Patch(':id')
  async updateAuthor(
    @Param('id') id: number,
    @Body() authorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.update(id, authorDto);
  }

  @Delete(':id')
  async removeAuthor(@Param('id') id: number) {
    return await this.authorService.remove(id);
  }
}
