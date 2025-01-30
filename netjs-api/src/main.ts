import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // whitelist = true => strip out any properties from the incoming request payload that are not explicitly defined
  //  in DTOs.
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  const config = new DocumentBuilder().addBearerAuth()
    .setTitle('Bookmarks API')
    .setDescription('API Docs For Bookmarks API.')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
