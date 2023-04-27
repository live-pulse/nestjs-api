import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/logging/logging.interceptor';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));
  await app.listen(3000);
}
bootstrap();
