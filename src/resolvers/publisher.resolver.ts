import { Query, Resolver } from '@nestjs/graphql';

import { Publisher } from 'src/entities/publisher.entity';
import { PublisherService } from 'src/services/publisher.service';

@Resolver()
export class PublisherResolver {
  constructor(private readonly publisherService: PublisherService) {}

  @Query(() => [Publisher])
  publishers(): Promise<Publisher[]> {
    return this.publisherService.findAll();
  }
}
