import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  NotImplementedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth (JWT)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user and issue a JWT' })
  register(@Body() registerDto: RegisterDto) {
    // TODO: Wire up to authService.register(registerDto)
    throw new NotImplementedException('POST /api/auth/register not implemented');
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and issue a JWT' })
  login(@Body() loginDto: LoginDto) {
    // TODO: Wire up to authService.login(loginDto)
    throw new NotImplementedException('POST /api/auth/login not implemented');
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user from JWT' })
  getProfile(@Req() req: any) {
    // TODO: Wire up to authService.getProfile(req.user.userId)
    throw new NotImplementedException('GET /api/auth/me not implemented');
  }
}
