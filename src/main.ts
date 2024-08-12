import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from './config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true, forbidNonWhitelisted: true, whitelist: true }));

  await app.listen(PORT);
}
console.log('XXXXXXXX');
console.log(process.env.MONGO);
console.log('XXXXXXXX');
bootstrap();
