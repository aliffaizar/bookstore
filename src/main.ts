import { createServer } from 'http';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Bookstore API')
    .setDescription('Bookstore API with NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      configService.get<string>('AUTHOR_NAME'),
      configService.get<string>('AUTHOR_WEBSITE'),
      configService.get<string>('AUTHOR_EMAIL'),
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [],
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('/', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.init();
  const server = createServer((req, res) =>
    app.getHttpServer().emit('request', req, res),
  );
  if (process.env.NODE_ENV === 'development') {
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } else {
    server.listen();
  }
}
bootstrap();
