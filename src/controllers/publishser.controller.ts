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
import { Roles } from 'src/decorators/roles.decorator';

import { PublisherDto } from 'src/dto/publisher.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { PublisherService } from 'src/services/publisher.service';

@ApiTags('Publishers')
@Controller('publishers')
export class PublisherController {
  constructor(private readonly publisherServive: PublisherService) {}

  @Get()
  async getPublishers() {
    return await this.publisherServive.findAll();
  }

  @Get(':id')
  async getPublisher(@Param('id') id: number) {
    return await this.publisherServive.findOne(id);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async createPublisher(@Body() publisherDto: PublisherDto) {
    return await this.publisherServive.createPublisher(publisherDto);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  async updatePublisher(
    @Body() publisherDto: PublisherDto,
    @Param('id') id: number,
  ) {
    return await this.publisherServive.update(id, publisherDto);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Delete(':id')
  async removePublisher(@Param('id') id: number) {
    return await this.publisherServive.remove(id);
  }
}
