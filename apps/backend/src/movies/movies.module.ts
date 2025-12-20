import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TmdbClient } from './tmdb.client';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, TmdbClient],
  exports: [MoviesService],
})
export class MoviesModule {}
