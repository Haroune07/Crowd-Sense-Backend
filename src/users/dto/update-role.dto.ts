import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole } from '../../common/enums/role.enum';

export class UpdateRoleDto {
  @ApiProperty({ enum: UserRole, example: UserRole.ORGANIZER })
  @IsEnum(UserRole)
  role: UserRole;
}
