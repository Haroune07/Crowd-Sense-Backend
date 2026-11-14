import { Injectable, NotImplementedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string }> {
    // TODO: Implement user registration, password hashing, and JWT signing
    throw new NotImplementedException('AuthService.register not implemented');
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    // TODO: Implement credential verification and JWT signing via jwtService.signAsync()
    throw new NotImplementedException('AuthService.login not implemented');
  }

  async getProfile(userId: string): Promise<any> {
    // TODO: Implement returning authenticated user's profile
    throw new NotImplementedException('AuthService.getProfile not implemented');
  }
}
