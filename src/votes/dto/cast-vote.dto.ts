import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CastVoteDto {
  @ApiPropertyOptional({
    example: 'user-uuid-123',
    description:
      'Optional fallback userId if unauthenticated; uses JWT userId when logged in',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ example: 0, description: '0-based index of chosen option' })
  @IsInt()
  @Min(0)
  optionIndex: number;
}
