import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CastVoteDto {
  @ApiProperty({ example: 'user-uuid-123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 0, description: '0-based index of chosen option' })
  @IsInt()
  @Min(0)
  optionIndex: number;
}
