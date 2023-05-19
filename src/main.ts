import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/logging/logging.interceptor';
import { GlobalExceptionFilter } from './common/exception/exception.filter';
import { ForBiddenExceptionFilter } from './common/exception/forbidden-exception.filter';
import { setupSwagger } from './common/swagger';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new ForBiddenExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));
  setupSwagger(app);
  await app.listen(8080);
}
bootstrap();
