import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Anon-42' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiPropertyOptional({
    enum: UserRole,
    default: UserRole.PROTESTER,
    description: 'Ignored on creation — new users always start as protester',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
