import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Publisher } from 'src/entities/publisher.entity';
import { PublisherDto } from 'src/dto/publisher.dto';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  async findAll(): Promise<Publisher[]> {
    const publishers = await this.publisherRepository.find();
    return publishers;
  }

  async findOne(id: number): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne({ where: { id } });
    if (!publisher) {
      throw new NotFoundException('Publisher not found');
    }
    return publisher;
  }

  async createPublisher(publisherDto: PublisherDto): Promise<Publisher> {
    const publisher = await this.publisherRepository.save(publisherDto);
    return publisher;
  }

  async update(id: number, publisherDto: PublisherDto): Promise<Publisher> {
    const publisher = await this.publisherRepository.update(id, publisherDto);
    if (publisher.affected === 0) {
      throw new NotFoundException('Publisher not found');
    }
    return await this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const publisher = await this.publisherRepository.delete(id);
    if (publisher.affected === 0) {
      throw new NotFoundException('Publisher not found');
    }
    return publisher;
  }
}
