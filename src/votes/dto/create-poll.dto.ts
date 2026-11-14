import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePollDto {
  @ApiProperty({ example: 'Should the march redirect to City Hall Plaza?' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    example: [
      'Yes, head to City Hall',
      'Stay at Central Square',
      'Disperse safely',
    ],
  })
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  options: string[];
}
