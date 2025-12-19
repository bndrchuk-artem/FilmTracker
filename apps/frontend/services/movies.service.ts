import api from './api';
import { Media } from '@/types';

export interface SearchResponse {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}

export const moviesService = {
  async search(query: string, page: number = 1): Promise<SearchResponse> {
    const response = await api.get<SearchResponse>('/movies/search', {
      params: { query, page },
    });
    return response.data;
  },

  async getTrending(): Promise<Media[]> {
    const response = await api.get<Media[]>('/movies/trending');
    return response.data;
  },

  async getDetails(id: number, type: 'movie' | 'tv'): Promise<Media> {
    const response = await api.get<Media>(`/movies/${id}`, {
      params: { type },
    });
    return response.data;
  },

  async getSimilar(id: number, type: 'movie' | 'tv'): Promise<Media[]> {
    const response = await api.get<Media[]>(`/movies/${id}/similar`, {
      params: { type },
    });
    return response.data;
  },
};