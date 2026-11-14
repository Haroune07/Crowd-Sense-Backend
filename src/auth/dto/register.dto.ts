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

  @ApiPropertyOptional({
    enum: UserRole,
    default: UserRole.PROTESTER,
    description:
      'Ignored on registration — users always register as protester and become organizer by creating a protest',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
