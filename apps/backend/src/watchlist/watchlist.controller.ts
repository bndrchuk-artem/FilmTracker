import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { WatchlistService } from './watchlist.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../common/entities/user.entity';
import { AddToWatchlistDto } from './dto/add-to-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { QueryWatchlistDto } from './dto/query-watchlist.dto';

@ApiTags('Watchlist')
@Controller('watchlist')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  @ApiOperation({ summary: 'Додати фільм/серіал у watchlist' })
  @ApiResponse({ status: 201, description: 'Елемент додано до watchlist' })
  @ApiResponse({ status: 409, description: 'Елемент вже існує в watchlist' })
  @ApiResponse({ status: 401, description: 'Не авторизований' })
  addToWatchlist(@CurrentUser() user: User, @Body() addDto: AddToWatchlistDto) {
    return this.watchlistService.addToWatchlist(user.id, addDto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати watchlist користувача' })
  @ApiResponse({ status: 200, description: 'Список watchlist' })
  @ApiResponse({ status: 401, description: 'Не авторизований' })
  getWatchlist(
    @CurrentUser() user: User,
    @Query() queryDto: QueryWatchlistDto,
  ) {
    return this.watchlistService.getWatchlist(user.id, queryDto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Отримати статистику watchlist' })
  @ApiResponse({ status: 200, description: 'Статистика watchlist' })
  @ApiResponse({ status: 401, description: 'Не авторизований' })
  getStats(@CurrentUser() user: User) {
    return this.watchlistService.getWatchlistStats(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати один елемент watchlist' })
  @ApiParam({ name: 'id', description: 'ID елемента watchlist' })
  @ApiResponse({ status: 200, description: 'Елемент watchlist' })
  @ApiResponse({ status: 404, description: 'Елемент не знайдено' })
  @ApiResponse({ status: 403, description: 'Доступ заборонено' })
  @ApiResponse({ status: 401, description: 'Не авторизований' })
  getWatchlistItem(@CurrentUser() user: User, @Param('id') itemId: string) {
    return this.watchlistService.getWatchlistItem(user.id, itemId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Оновити статус елемента watchlist' })
  @ApiParam({ name: 'id', description: 'ID елемента watchlist' })
  @ApiResponse({ status: 200, description: 'Статус оновлено' })
  @ApiResponse({ status: 404, description: 'Елемент не знайдено' })
  @ApiResponse({ status: 403, description: 'Доступ заборонено' })
  @ApiResponse({ status: 401, description: 'Не авторизований' })
  updateStatus(
    @CurrentUser() user: User,
    @Param('id') itemId: string,
    @Body() updateDto: UpdateWatchlistDto,
  ) {
    return this.watchlistService.updateStatus(user.id, itemId, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити елемент з watchlist' })
  @ApiParam({ name: 'id', description: 'ID елемента watchlist' })
  @ApiResponse({ status: 200, description: 'Елемент видалено' })
  @ApiResponse({ status: 404, description: 'Елемент не знайдено' })
  @ApiResponse({ status: 403, description: 'Доступ заборонено' })
  @ApiResponse({ status: 401, description: 'Не авторизований' })
  removeFromWatchlist(@CurrentUser() user: User, @Param('id') itemId: string) {
    this.watchlistService.removeFromWatchlist(user.id, itemId);
    return { message: 'Item removed from watchlist' };
  }
}
