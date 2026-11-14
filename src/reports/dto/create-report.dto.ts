import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    example: 'manifestation-uuid-123',
    description: 'The protest/manifestation this status report belongs to',
  })
  @IsString()
  @IsNotEmpty()
  manifestationId: string;

  @ApiProperty({ example: 45.5017, description: 'Latitude' })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: -73.5673, description: 'Longitude' })
  @IsNumber()
  lng: number;

  @ApiProperty({
    example: 5,
    description: 'Dangerosity level (1 = pacific, 5 = urgent danger)',
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  dangerLevel: number;

  @ApiPropertyOptional({ example: 'Tear gas deployed near the North square' })
  @IsOptional()
  @IsString()
  description?: string;
}
