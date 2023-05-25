import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthorService } from 'src/services/author.service';
import { CreateAuthorDto, UpdateAuthorDto } from 'src/dto/author.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
import {
  CreateAuthorApi,
  DeleteAuthorApi,
  GetAuthorApi,
  GetAuthorsApi,
  UpdateAuthorApi,
} from 'src/decorators/docs/author.api';

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @GetAuthorsApi()
  @Get()
  async getAuthors() {
    return await this.authorService.findAll();
  }

  @GetAuthorApi()
  @Get(':id')
  async getAuthor(@Param('id') id: number) {
    return await this.authorService.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @CreateAuthorApi()
  @Post()
  async createAuthor(@Body() authorDto: CreateAuthorDto) {
    return await this.authorService.createAuthor(authorDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @UpdateAuthorApi()
  @Patch(':id')
  async updateAuthor(
    @Param('id') id: number,
    @Body() authorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.update(id, authorDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @DeleteAuthorApi()
  @Delete(':id')
  async removeAuthor(@Param('id') id: number) {
    return await this.authorService.remove(id);
  }
}
