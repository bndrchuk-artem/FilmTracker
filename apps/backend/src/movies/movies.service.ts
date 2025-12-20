import { Injectable } from '@nestjs/common';
import { TmdbClient } from './tmdb.client';
import { SearchMoviesDto } from './dto/search-movies.dto';
import {
  TmdbSearchResponse,
  TmdbMedia,
  TmdbMovie,
  TmdbTVShow,
} from './types/tmdb.types';

@Injectable()
export class MoviesService {
  constructor(private readonly tmdbClient: TmdbClient) {}

  // Arrow function для правильного біндінгу this
  private hasMediaType = (item: unknown): item is TmdbMedia => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'media_type' in item &&
      (item.media_type === 'movie' || item.media_type === 'tv')
    );
  };

  async search(searchDto: SearchMoviesDto): Promise<TmdbSearchResponse> {
    const { query, page = 1 } = searchDto;

    const response = await this.tmdbClient.get<TmdbSearchResponse>(
      '/search/multi',
      {
        query,
        page,
        include_adult: false,
      },
    );

    // Фільтруємо тільки фільми та серіали
    response.results = response.results.filter(this.hasMediaType);

    return response;
  }

  async getDetails(
    id: number,
    mediaType: 'movie' | 'tv',
  ): Promise<TmdbMovie | TmdbTVShow> {
    const endpoint = mediaType === 'movie' ? `/movie/${id}` : `/tv/${id}`;

    if (mediaType === 'movie') {
      const details = await this.tmdbClient.get<TmdbMovie>(endpoint);
      return {
        ...details,
        media_type: 'movie',
      };
    } else {
      const details = await this.tmdbClient.get<TmdbTVShow>(endpoint);
      return {
        ...details,
        media_type: 'tv',
      };
    }
  }

  async getTrending(): Promise<TmdbMedia[]> {
    const response =
      await this.tmdbClient.get<TmdbSearchResponse>('/trending/all/week');

    // Фільтруємо тільки фільми та серіали
    const filtered = response.results.filter(this.hasMediaType);

    // Повертаємо топ-10
    return filtered.slice(0, 10);
  }

  async getSimilar(
    id: number,
    mediaType: 'movie' | 'tv',
  ): Promise<TmdbMedia[]> {
    const endpoint =
      mediaType === 'movie' ? `/movie/${id}/similar` : `/tv/${id}/similar`;

    const response = await this.tmdbClient.get<TmdbSearchResponse>(endpoint);

    return response.results.map((item) => ({
      ...item,
      media_type: mediaType,
    })) as TmdbMedia[];
  }
}
