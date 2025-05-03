import { Controller, Get, Param, Delete, Logger } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get('getAll')
  getAll() {
    //logger.info('Get all movies');
    Logger.log(
      'log request all movies',
      JSON.stringify({ userId: 123123, movie: 1 }),
    );
    Logger.warn('warn request all movies');
    Logger.error('error request all movies');
    Logger.debug('debug request all movies');
    Logger.fatal('fatal request all movies');
    Logger.verbose('verbose request all movies');
    return 'This will return all movies';
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    Logger.log(
      'log request movie',
      JSON.stringify({ userId: 123123, movie: movieId }),
    );
    return `This will return one movie with the id: ${movieId}`;
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
