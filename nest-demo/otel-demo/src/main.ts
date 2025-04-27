import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import otelSDK from './instrumentation';

async function bootstrap() {
  // Start SDK before nestjs factory create
  otelSDK.start();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
  const logger = new Logger('bootstrap');
  logger.log(`Server listening on ${await app.getUrl()}`);
}
bootstrap();
