import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorController } from 'src/controllers/author.controller';
import { Author } from 'src/entities/author.entity';
import { AuthorResolver } from 'src/resolvers/author.resolver';
import { AuthorService } from 'src/services/author.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorResolver],
})
export class AuthorModule {}
