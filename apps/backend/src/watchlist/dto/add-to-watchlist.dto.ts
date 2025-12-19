import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  MediaType,
  WatchlistStatus,
} from '../../common/entities/watchlist-item.entity';

export class AddToWatchlistDto {
  @ApiProperty({
    example: 27205,
    description: 'ID фільму/серіалу з TMDB',
  })
  @IsInt()
  @IsNotEmpty()
  tmdbId: number;

  @ApiProperty({
    example: 'movie',
    enum: MediaType,
    description: 'Тип медіа',
  })
  @IsEnum(MediaType)
  @IsNotEmpty()
  mediaType: MediaType;

  @ApiProperty({
    example: 'plan_to_watch',
    enum: WatchlistStatus,
    description: 'Статус перегляду',
  })
  @IsEnum(WatchlistStatus)
  @IsNotEmpty()
  status: WatchlistStatus;
}
