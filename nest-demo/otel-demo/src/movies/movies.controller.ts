import { Controller, Get, Param, Delete, Logger, BadRequestException } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get('getAll')
  getAll() {
    Logger.verbose({ message: 'verbose request all movies' });
    Logger.log({ message: 'log request all movies', context: 'movies' });
    Logger.warn({ message: 'warn request all movies' });
    Logger.error({ message: 'error request all movies' });
    Logger.debug({ message: 'debug request all movies' });
    Logger.fatal({ message: 'fatal request all movies' });
    return 'This will return all movies';
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    try {
      Logger.log({
        message: 'log request movie',
        data: { userId: 123123, movie: movieId },
      });
      // This random error is for demonstration purposes only
      // TODO: Remove or make configurable before production deployment
      if (Math.random() > 0.5) {
        throw new BadRequestException('Random error occurred');
      }
      return `This will return one movie with the id: ${movieId}`;
    } catch (error) {
      if (error instanceof Error) {
        Logger.error('error request movie', error.stack);
      } else {
        Logger.error('error request movie', 'Unknown error');
      }
      // Re-throw the error to maintain consistent API behavior
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    Logger.log(
      'log request movie',
      JSON.stringify({ userId: 123123, movie: movieId }),
    );
    return `This will delete a movie with the id: ${movieId}`;
  }
}
