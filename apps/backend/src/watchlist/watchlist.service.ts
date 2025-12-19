import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryStorage } from '../common/storage/in-memory.storage';
import {
  WatchlistItem,
  WatchlistStatus,
} from '../common/entities/watchlist-item.entity';
import { AddToWatchlistDto } from './dto/add-to-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { QueryWatchlistDto } from './dto/query-watchlist.dto';

@Injectable()
export class WatchlistService {
  private watchlistStorage = new InMemoryStorage<WatchlistItem>();

  addToWatchlist(userId: string, addDto: AddToWatchlistDto): WatchlistItem {
    const existing = this.watchlistStorage.find(
      (item) =>
        item.userId === userId &&
        item.tmdbId === addDto.tmdbId &&
        item.mediaType === addDto.mediaType,
    );

    if (existing) {
      throw new ConflictException('Item already exists in watchlist');
    }

    const watchlistItem: WatchlistItem = {
      id: uuidv4(),
      userId,
      tmdbId: addDto.tmdbId,
      mediaType: addDto.mediaType,
      status: addDto.status,
      addedAt: new Date(),
      updatedAt: new Date(),
    };

    this.watchlistStorage.set(watchlistItem.id, watchlistItem);

    return watchlistItem;
  }

  getWatchlist(userId: string, queryDto?: QueryWatchlistDto): WatchlistItem[] {
    let items = this.watchlistStorage.filter((item) => item.userId === userId);

    if (queryDto?.status) {
      items = items.filter((item) => item.status === queryDto.status);
    }

    return items.sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
  }

  getWatchlistItem(userId: string, itemId: string): WatchlistItem {
    const item = this.watchlistStorage.get(itemId);

    if (!item) {
      throw new NotFoundException('Watchlist item not found');
    }

    if (item.userId !== userId) {
      throw new ForbiddenException('Access denied to this watchlist item');
    }

    return item;
  }

  updateStatus(
    userId: string,
    itemId: string,
    updateDto: UpdateWatchlistDto,
  ): WatchlistItem {
    const item = this.getWatchlistItem(userId, itemId);

    item.status = updateDto.status;
    item.updatedAt = new Date();

    this.watchlistStorage.set(itemId, item);

    return item;
  }

  removeFromWatchlist(userId: string, itemId: string): void {
    this.getWatchlistItem(userId, itemId);
    this.watchlistStorage.delete(itemId);
  }

  getWatchlistStats(userId: string) {
    const items = this.watchlistStorage.filter(
      (item) => item.userId === userId,
    );

    const stats = {
      total: items.length,
      plan_to_watch: items.filter(
        (item) => item.status === WatchlistStatus.PLAN_TO_WATCH,
      ).length,
      watching: items.filter((item) => item.status === WatchlistStatus.WATCHING)
        .length,
      watched: items.filter((item) => item.status === WatchlistStatus.WATCHED)
        .length,
      dropped: items.filter((item) => item.status === WatchlistStatus.DROPPED)
        .length,
    };

    return stats;
  }
}
