import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WatchlistStatus } from '../../common/entities/watchlist-item.entity';

export class UpdateWatchlistDto {
  @ApiProperty({
    example: 'watched',
    enum: WatchlistStatus,
    description: 'Новий статус перегляду',
  })
  @IsEnum(WatchlistStatus)
  @IsNotEmpty()
  status: WatchlistStatus;
}
