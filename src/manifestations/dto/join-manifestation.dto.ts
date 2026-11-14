import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinManifestationDto {
  @ApiProperty({
    example: 'CEGEP1',
    description: '6-character protest join code received on MIO / Omnivox',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
