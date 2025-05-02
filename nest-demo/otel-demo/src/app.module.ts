import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './movies/movies.controller';
import { OpenTelemetryModule } from 'nestjs-otel';
import { ConfigModule } from '@nestjs/config';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    apiMetrics: {
      enable: true,
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
