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
import {
  CreatePublisherApi,
  DeletePublisherApi,
  GetPublisherApi,
  GetPublishersApi,
  UpdatePublisherApi,
} from 'src/decorators/docs/publisher.api';
import { Roles } from 'src/decorators/roles.decorator';

import { PublisherDto } from 'src/dto/publisher.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { PublisherService } from 'src/services/publisher.service';

@ApiTags('Publishers')
@Controller('publishers')
export class PublisherController {
  constructor(private readonly publisherServive: PublisherService) {}

  @GetPublishersApi()
  @Get()
  async getPublishers() {
    return await this.publisherServive.findAll();
  }

  @GetPublisherApi()
  @Get(':id')
  async getPublisher(@Param('id') id: number) {
    return await this.publisherServive.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @CreatePublisherApi()
  @Post()
  async createPublisher(@Body() publisherDto: PublisherDto) {
    return await this.publisherServive.createPublisher(publisherDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @UpdatePublisherApi()
  @Patch(':id')
  async updatePublisher(
    @Body() publisherDto: PublisherDto,
    @Param('id') id: number,
  ) {
    return await this.publisherServive.update(id, publisherDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @DeletePublisherApi()
  @Delete(':id')
  async removePublisher(@Param('id') id: number) {
    return await this.publisherServive.remove(id);
  }
}
