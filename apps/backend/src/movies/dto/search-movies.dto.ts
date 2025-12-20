import { IsOptional, IsString, IsInt, Min, Max } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class SearchMoviesDto {
  @ApiProperty({
    description: "Пошуковий запит",
    example: "inception",
    required: true,
  })
  @IsString()
  query: string;

  @ApiProperty({
    description: "Номер сторінки",
    example: 1,
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;
}
