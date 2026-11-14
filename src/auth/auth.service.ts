import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  private readonly googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
  );

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signTokenForUser(user: User): Promise<string> {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
      manifestationId: user.manifestationId ?? null,
    });
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string; user: User }> {
    const existing = await this.usersService.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    // Security rule: ignore incoming role and always register as PROTESTER
    const user = await this.usersService.createWithPassword({
      displayName: registerDto.displayName,
      email: registerDto.email,
      passwordHash,
      role: UserRole.PROTESTER,
    });

    const accessToken = await this.signTokenForUser(user);
    return { accessToken, user };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.usersService.findByEmailWithPassword(
      loginDto.email,
    );
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    delete user.passwordHash;
    const accessToken = await this.signTokenForUser(user);
    return { accessToken, user };
  }

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

    const accessToken = await this.signTokenForUser(user);
    return { accessToken, user };
  }

  async getProfile(userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }
}
