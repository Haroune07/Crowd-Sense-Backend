import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinManifestationDto {
  @ApiProperty({
    example: 'MAIS-8492',
    description: 'Token received by students via MIO on Omnivox',
  })
  @IsString()
  @IsNotEmpty()
  joinToken: string;
}
