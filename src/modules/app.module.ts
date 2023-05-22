import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { User } from 'src/entities/user.entity';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';
import { Category } from 'src/entities/category.entity';
import { Publisher } from 'src/entities/publisher.entity';
import { BookModule } from './book.module';
import { CategoryModule } from './category.module';
import { AuthorModule } from './author.module';
import { PublisherModule } from './publisher.module';
import { validate } from 'src/configs/env.validation';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { OrderModule } from './order.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [User, Author, Book, Category, Order, OrderItem, Publisher],
        synchronize: true,
      }),
    }),
    AuthModule,
    AuthorModule,
    BookModule,
    CategoryModule,
    OrderModule,
    PublisherModule,
    UserModule,
  ],
  controllers: [],
  providers: [AppService, { provide: 'APP_GUARD', useClass: ThrottlerGuard }],
})
export class AppModule {}
