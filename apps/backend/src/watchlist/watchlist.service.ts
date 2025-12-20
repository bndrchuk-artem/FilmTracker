import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WatchlistStatus } from '../common/entities/watchlist-item.entity';
import { AddToWatchlistDto } from './dto/add-to-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { QueryWatchlistDto } from './dto/query-watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(private readonly prisma: PrismaService) {}

  async addToWatchlist(userId: string, addDto: AddToWatchlistDto) {
    // Перевірка чи елемент вже існує
    const existing = await this.prisma.watchlistItem.findUnique({
      where: {
        userId_tmdbId_mediaType: {
          userId,
          tmdbId: addDto.tmdbId,
          mediaType: addDto.mediaType,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Item already exists in watchlist');
    }

    // Створення нового елемента
    const watchlistItem = await this.prisma.watchlistItem.create({
      data: {
        userId,
        tmdbId: addDto.tmdbId,
        mediaType: addDto.mediaType,
        status: addDto.status,
      },
    });

    return watchlistItem;
  }

  async getWatchlist(userId: string, queryDto?: QueryWatchlistDto) {
    const items = await this.prisma.watchlistItem.findMany({
      where: {
        userId,
        ...(queryDto?.status && { status: queryDto.status }),
      },
      orderBy: {
        addedAt: 'desc',
      },
    });

    return items;
  }

  async getWatchlistItem(userId: string, itemId: string) {
    const item = await this.prisma.watchlistItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('Watchlist item not found');
    }

    if (item.userId !== userId) {
      throw new ForbiddenException('Access denied to this watchlist item');
    }

    return item;
  }

  async updateStatus(
    userId: string,
    itemId: string,
    updateDto: UpdateWatchlistDto,
  ) {
    const item = await this.getWatchlistItem(userId, itemId);

    const updatedItem = await this.prisma.watchlistItem.update({
      where: { id: itemId },
      data: {
        status: updateDto.status,
      },
    });

    return updatedItem;
  }

  async removeFromWatchlist(userId: string, itemId: string): Promise<void> {
    await this.getWatchlistItem(userId, itemId);

    await this.prisma.watchlistItem.delete({
      where: { id: itemId },
    });
  }

  async getWatchlistStats(userId: string) {
    const items = await this.prisma.watchlistItem.findMany({
      where: { userId },
    });

    const stats = {
      total: items.length,
      plan_to_watch: items.filter((item) => item.status === 'PLAN_TO_WATCH')
        .length,
      watching: items.filter((item) => item.status === 'WATCHING').length,
      watched: items.filter((item) => item.status === 'WATCHED').length,
      dropped: items.filter((item) => item.status === 'DROPPED').length,
    };

    return stats;
  }
}
