import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { User } from 'src/entities/user.entity';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';
import { Category } from 'src/entities/category.entity';
import { Publisher } from 'src/entities/publisher.entity';
import { BookModule } from './book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'bookstore',
      username: 'root',
      password: 'admin123',
      entities: [Author, Book, Category, Publisher, User],
      synchronize: true,
    }),
    BookModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
