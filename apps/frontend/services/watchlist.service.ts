import api from './api';
import { WatchlistItem, WatchlistStatus, MediaType } from '@/types';

export interface WatchlistStats {
  total: number;
  plan_to_watch: number;
  watching: number;
  watched: number;
  dropped: number;
}

export const watchlistService = {
  async getWatchlist(status?: WatchlistStatus): Promise<WatchlistItem[]> {
    const response = await api.get<WatchlistItem[]>('/watchlist', {
      params: status ? { status } : {},
    });
    return response.data;
  },

  async addToWatchlist(
    tmdbId: number,
    mediaType: MediaType,
    status: WatchlistStatus,
  ): Promise<WatchlistItem> {
    const response = await api.post<WatchlistItem>('/watchlist', {
      tmdbId,
      mediaType,
      status,
    });
    return response.data;
  },

  async updateStatus(
    itemId: string,
    status: WatchlistStatus,
  ): Promise<WatchlistItem> {
    const response = await api.patch<WatchlistItem>(`/watchlist/${itemId}`, {
      status,
    });
    return response.data;
  },

  async removeFromWatchlist(itemId: string): Promise<void> {
    await api.delete(`/watchlist/${itemId}`);
  },

  async getStats(): Promise<WatchlistStats> {
    const response = await api.get<WatchlistStats>('/watchlist/stats');
    return response.data;
  },
};