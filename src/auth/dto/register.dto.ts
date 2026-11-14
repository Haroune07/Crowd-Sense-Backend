import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../common/enums/role.enum';

export class RegisterDto {
  @ApiProperty({ example: 'Anon-42' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({ example: 'protester@crowdsense.org' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'super-secret-password', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.PROTESTER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
