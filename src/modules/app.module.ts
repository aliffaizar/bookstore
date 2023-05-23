import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { BookModule } from './book.module';
import { CategoryModule } from './category.module';
import { AuthorModule } from './author.module';
import { PublisherModule } from './publisher.module';
import { validate } from 'src/configs/env.validation';
import { OrderModule } from './order.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    EventEmitterModule.forRoot(),
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
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
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
