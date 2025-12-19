import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchMoviesDto } from './dto/search-movies.dto';
import { MOCK_MOVIES, MOCK_TV_SHOWS } from './data/mock-movies.data';
import { Media, SearchResponse } from '../common/entities/movie.entity';

@Injectable()
export class MoviesService {
  private allMedia: Media[] = [...MOCK_MOVIES, ...MOCK_TV_SHOWS];

  search(searchDto: SearchMoviesDto): SearchResponse {
    const { query, page = 1 } = searchDto;

    // Фільтрація за пошуковим запитом
    const filtered = this.allMedia.filter((media) => {
      const title = 'title' in media ? media.title : media.name;
      return title.toLowerCase().includes(query.toLowerCase());
    });

    // Пагінація (10 результатів на сторінку)
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = filtered.slice(startIndex, endIndex);

    return {
      page,
      results: paginatedResults,
      total_pages: Math.ceil(filtered.length / pageSize),
      total_results: filtered.length,
    };
  }

  getDetails(id: number, mediaType: 'movie' | 'tv'): Media {
    const media = this.allMedia.find(
      (m) => m.id === id && m.media_type === mediaType,
    );

    if (!media) {
      throw new NotFoundException(
        `${mediaType === 'movie' ? 'Movie' : 'TV Show'} with id ${id} not found`,
      );
    }

    return media;
  }

  getTrending(): Media[] {
    // Повертаємо топ-5 за рейтингом
    return [...this.allMedia]
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 5);
  }

  getSimilar(id: number, mediaType: 'movie' | 'tv'): Media[] {
    const currentMedia = this.getDetails(id, mediaType);

    // Фільтруємо по genre_ids (мокова логіка)
    const similar = this.allMedia.filter((media) => {
      if (media.id === id) return false;

      // Перевіряємо чи є спільні жанри
      const commonGenres = media.genre_ids.filter((genreId) =>
        currentMedia.genre_ids.includes(genreId),
      );

      return commonGenres.length > 0;
    });

    return similar.slice(0, 5);
  }
}
