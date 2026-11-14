import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'protester@crowdsense.org' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'super-secret-password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
