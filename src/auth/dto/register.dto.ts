import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Anon-42' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({ example: 'student@cegep.qc.ca' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'super-secret-password', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
