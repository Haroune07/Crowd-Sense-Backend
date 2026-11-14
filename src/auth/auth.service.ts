import {
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
  );

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async googleLogin(
    idToken: string,
  ): Promise<{ accessToken: string; user: User }> {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      throw new UnauthorizedException('GOOGLE_CLIENT_ID is not configured');
    }

    let payload;
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: clientId,
      });
      payload = ticket.getPayload();
    } catch {
      throw new UnauthorizedException('Invalid Google ID token');
    }

    if (!payload?.email) {
      throw new UnauthorizedException('Google account email is required');
    }

    const user = await this.usersService.findOrCreateGoogleUser({
      email: payload.email,
      displayName: payload.name || payload.email.split('@')[0],
    });

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken, user };
  }

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

  async getProfile(userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }
}
