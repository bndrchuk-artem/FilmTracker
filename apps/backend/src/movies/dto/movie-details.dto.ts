import { ApiProperty } from '@nestjs/swagger';

export class MovieDetailsDto {
  @ApiProperty({ example: 27205 })
  id: number;

  @ApiProperty({ example: 'Inception' })
  title?: string;

  @ApiProperty({ example: 'Breaking Bad' })
  name?: string;

  @ApiProperty({ example: 'A thief who steals corporate secrets...' })
  overview: string;

  @ApiProperty({ example: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' })
  poster_path: string | null;

  @ApiProperty({ example: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg' })
  backdrop_path: string | null;

  @ApiProperty({ example: '2010-07-15' })
  release_date?: string;

  @ApiProperty({ example: '2008-01-20' })
  first_air_date?: string;

  @ApiProperty({ example: 8.4 })
  vote_average: number;

  @ApiProperty({ example: [28, 878, 53] })
  genre_ids: number[];

  @ApiProperty({ example: 'movie', enum: ['movie', 'tv'] })
  media_type: string;
}
