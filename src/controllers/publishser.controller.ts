import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PublisherDto } from 'src/dto/publisher.dto';
import { PublisherService } from 'src/services/publisher.service';

@Controller('publishers')
export class PublisherController {
  constructor(private readonly publisherServive: PublisherService) {}

  @Get()
  async getPublishers() {
    return await this.publisherServive.findAll();
  }

  @Get(':id')
  async getPublisher(@Param() id: number) {
    return await this.publisherServive.findOne(id);
  }

  @Post()
  async createPublisher(@Body() publisherDto: PublisherDto) {
    return await this.publisherServive.createPublisher(publisherDto);
  }

  @Patch(':id')
  async updatePublisher(
    @Body() publisherDto: PublisherDto,
    @Param() id: number,
  ) {
    return await this.publisherServive.update(id, publisherDto);
  }

  @Delete(':id')
  async removePublisher(@Param() id: number) {
    return await this.publisherServive.remove(id);
  }
}
