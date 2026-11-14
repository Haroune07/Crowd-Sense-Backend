import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @ApiPropertyOptional({
    example: 'user-uuid-123',
    description: 'Optional fallback userId if unauthenticated',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ example: 45.551, description: 'Latitude' })
  @IsNumber()
  lat: number;

  @ApiProperty({ example: -73.549, description: 'Longitude' })
  @IsNumber()
  lng: number;

  @ApiProperty({
    example: 5,
    description: 'Dangerosity level (1 = calm/peaceful, 5 = urgent danger)',
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
