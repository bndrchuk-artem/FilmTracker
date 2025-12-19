import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WatchlistStatus } from '../../common/entities/watchlist-item.entity';

export class QueryWatchlistDto {
  @ApiProperty({
    required: false,
    enum: WatchlistStatus,
    description: 'Фільтрувати за статусом',
  })
  @IsOptional()
  @IsEnum(WatchlistStatus)
  status?: WatchlistStatus;
}
