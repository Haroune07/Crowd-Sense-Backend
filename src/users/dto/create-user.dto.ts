import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Anon-42' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiPropertyOptional({ example: 'student@cegep.qc.ca' })
  @IsOptional()
  @IsEmail()
  email?: string;
}
