import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePollDto {
  @ApiPropertyOptional({
    example: 'Updated: Should the march redirect to City Hall Plaza?',
  })
  @IsOptional()
  @IsString()
  question?: string;

  @ApiPropertyOptional({
    example: ['Yes, head to City Hall', 'Stay at Central Square'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  options?: string[];

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
