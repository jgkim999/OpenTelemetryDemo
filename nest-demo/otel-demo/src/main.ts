import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import otelSDK from './instrumentation';
import { Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  // Start SDK before nestjs factory create
  otelSDK.start();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(process.env.PORT ?? 3001);
  const logger = new Logger('bootstrap');
  logger.log(`Server listening on ${await app.getUrl()}`);
}
bootstrap();
