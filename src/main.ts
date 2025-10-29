// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware de cookies
  app.use(cookieParser());

  // Validação global
  app.useGlobalPipes(new ValidationPipe());

  // CORS configurado para frontend com credenciais
  app.enableCors({
    origin: 'http://localhost:5173', // URL do frontend
    credentials: true, // permite cookies HTTP-only
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
