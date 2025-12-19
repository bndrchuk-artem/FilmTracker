import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { SearchMoviesDto } from './dto/search-movies.dto';
import { MovieDetailsDto } from './dto/movie-details.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  @ApiOperation({ summary: 'Пошук фільмів і серіалів' })
  @ApiQuery({
    name: 'query',
    description: 'Пошуковий запит',
    example: 'inception',
  })
  @ApiQuery({
    name: 'page',
    description: 'Номер сторінки',
    required: false,
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Результати пошуку' })
  search(@Query() searchDto: SearchMoviesDto) {
    return this.moviesService.search(searchDto);
  }

  @Get('trending')
  @ApiOperation({ summary: 'Топ trending контент' })
  @ApiResponse({
    status: 200,
    description: 'Список trending фільмів і серіалів',
  })
  getTrending() {
    return this.moviesService.getTrending();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримання деталей фільму/серіалу' })
  @ApiQuery({ name: 'type', enum: ['movie', 'tv'], description: 'Тип медіа' })
  @ApiResponse({
    status: 200,
    description: 'Деталі медіа',
    type: MovieDetailsDto,
  })
  @ApiResponse({ status: 404, description: 'Медіа не знайдено' })
  getDetails(
    @Param('id', ParseIntPipe) id: number,
    @Query('type') type: 'movie' | 'tv',
  ) {
    return this.moviesService.getDetails(id, type);
  }

  @Get(':id/similar')
  @ApiOperation({ summary: 'Отримання схожого контенту' })
  @ApiQuery({ name: 'type', enum: ['movie', 'tv'], description: 'Тип медіа' })
  @ApiResponse({ status: 200, description: 'Список схожого контенту' })
  getSimilar(
    @Param('id', ParseIntPipe) id: number,
    @Query('type') type: 'movie' | 'tv',
  ) {
    return this.moviesService.getSimilar(id, type);
  }
}
