import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AnnouncementSeverity } from '../entities/announcement.entity';

export class UpdateAnnouncementDto {
  @ApiPropertyOptional({ example: 'Updated Route Change' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated announcement message' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({ enum: AnnouncementSeverity })
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
