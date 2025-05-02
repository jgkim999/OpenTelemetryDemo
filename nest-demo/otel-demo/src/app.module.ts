import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';
import { ConfigModule } from '@nestjs/config';
import { OpenTelemetryModule } from 'nestjs-otel';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    apiMetrics: {
      enable: true,
      defaultAttributes: {
        // You can set default labels for api metrics
        custom: 'nest',
      },
      ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
      ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
      prefix: 'demo', // Add a custom prefix to all API metrics
    },
  },
});

@Module({
  imports: [
    OpenTelemetryModuleConfig,
    ConfigModule.forRoot({
      isGlobal: true, // 전체적으로 사용하기 위해
      //envFilePath: `.${process.env.NODE_ENV}.env`,
      envFilePath: `.env`,
    }),
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule {}
