import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateManifestationDto {
  @ApiProperty({ example: 'Grève Étudiante Automne 2026' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Cégep de Maisonneuve' })
  @IsString()
  @IsNotEmpty()
  cegep: string;

  @ApiPropertyOptional({
    example: 'Rassemblement devant l’entrée principale à 10h00.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
