import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublisherController } from 'src/controllers/publishser.controller';
import { Publisher } from 'src/entities/publisher.entity';
import { PublisherResolver } from 'src/resolvers/publisher.resolver';
import { PublisherService } from 'src/services/publisher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  controllers: [PublisherController],
  providers: [PublisherService, PublisherResolver],
})
export class PublisherModule {}
