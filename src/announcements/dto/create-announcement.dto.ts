import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AnnouncementSeverity } from '../entities/announcement.entity';

export class CreateAnnouncementDto {
  @ApiPropertyOptional({ example: 'organizer-uuid-1' })
  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiProperty({ example: 'Route Change - Avoid Main Blvd' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Barricades ahead. Medics stationed at West Park entrance.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiPropertyOptional({
    enum: AnnouncementSeverity,
    default: AnnouncementSeverity.INFO,
  })
  @IsOptional()
  @IsEnum(AnnouncementSeverity)
  severity?: AnnouncementSeverity;

  @ApiPropertyOptional({ example: 45.5017 })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional({ example: -73.5673 })
  @IsOptional()
  @IsNumber()
  lng?: number;
}
