import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CastVoteDto {
  @ApiProperty({ example: 0, description: '0-based index of chosen option' })
  @IsInt()
  @Min(0)
  optionIndex: number;
}
