import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateManifestationDto {
  @ApiProperty({ example: 'Grève Étudiante Cégep de Maisonneuve' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'Rassemblement pacifique devant le pavillon principal.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2026-11-14T13:00:00.000Z' })
  @IsDateString()
  startsAt: string;

  @ApiProperty({ example: 45.551, description: 'Meeting point latitude' })
  @IsNumber()
  meetingLat: number;

  @ApiProperty({ example: -73.549, description: 'Meeting point longitude' })
  @IsNumber()
  meetingLng: number;
}
