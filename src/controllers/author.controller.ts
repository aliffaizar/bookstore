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
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { AuthorService } from 'src/services/author.service';
import { CreateAuthorDto, UpdateAuthorDto } from 'src/dto/author.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('Authors')
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

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async createAuthor(@Body() authorDto: CreateAuthorDto) {
    return await this.authorService.createAuthor(authorDto);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async updateAuthor(
    @Param('id') id: number,
    @Body() authorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.update(id, authorDto);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async removeAuthor(@Param('id') id: number) {
    return await this.authorService.remove(id);
  }
}
