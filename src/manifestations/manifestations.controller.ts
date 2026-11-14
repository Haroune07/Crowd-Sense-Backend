import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ManifestationsService } from './manifestations.service';
import { CreateManifestationDto } from './dto/create-manifestation.dto';
import { JoinManifestationDto } from './dto/join-manifestation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Manifestations (Create / Join / Leave Protest)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('manifestations')
export class ManifestationsController {
  constructor(private readonly manifestationsService: ManifestationsService) {}

  @Post()
  @ApiOperation({
    summary:
      'Create a protest (generates 6-char code, sets role to organizer, returns protest + new accessToken)',
  })
  create(
    @Req() req: any,
    @Body() createManifestationDto: CreateManifestationDto,
  ) {
    return this.manifestationsService.create(
      req.user.userId,
      createManifestationDto,
    );
  }

  @Post('join')
  @ApiOperation({
    summary:
      'Join a protest with a 6-char code (sets role to protester and manifestationId, returns protest + new accessToken)',
  })
  join(@Req() req: any, @Body() joinManifestationDto: JoinManifestationDto) {
    return this.manifestationsService.join(
      req.user.userId,
      joinManifestationDto,
    );
  }

  @Get('current')
  @ApiOperation({
    summary:
      "Get the logged-in user's current protest (organizers also receive the join code)",
  })
  getCurrent(@Req() req: any) {
    return this.manifestationsService.getCurrent(req.user.userId);
  }

  @Post('leave')
  @ApiOperation({
    summary:
      'Leave current protest (clears manifestationId, resets role to protester, returns fresh accessToken)',
  })
  leave(@Req() req: any) {
    return this.manifestationsService.leave(req.user.userId);
  }
}
