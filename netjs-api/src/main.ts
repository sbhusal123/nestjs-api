import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // whitelist = true => strip out any properties from the incoming request payload that are not explicitly defined
  //  in DTOs.
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
