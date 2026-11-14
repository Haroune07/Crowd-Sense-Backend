import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  NotImplementedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ManifestationsService } from './manifestations.service';
import { CreateManifestationDto } from './dto/create-manifestation.dto';
import { JoinManifestationDto } from './dto/join-manifestation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Manifestations (CÉGEP Protests & MIO Join Token)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('manifestations')
export class ManifestationsController {
  constructor(private readonly manifestationsService: ManifestationsService) {}

  @Post()
  @ApiOperation({
    summary:
      'Create a new manifestation (anyone can create and become its organizer; generates MIO joinToken)',
  })
  create(
    @Req() req: any,
    @Body() createManifestationDto: CreateManifestationDto,
  ) {
    // TODO: Wire up to manifestationsService.create(req.user.userId, createManifestationDto)
    throw new NotImplementedException(
      'POST /api/manifestations not implemented',
    );
  }

  @Post('join')
  @ApiOperation({
    summary:
      'Join a manifestation using the MIO/Omnivox token (adds user as manifester)',
  })
  joinByToken(
    @Req() req: any,
    @Body() joinManifestationDto: JoinManifestationDto,
  ) {
    // TODO: Wire up to manifestationsService.joinByToken(req.user.userId, joinManifestationDto)
    throw new NotImplementedException(
      'POST /api/manifestations/join not implemented',
    );
  }

  @Get('mine')
  @ApiOperation({
    summary:
      'List ONLY the manifestations the current user belongs to (as organizer or manifester)',
  })
  findMine(@Req() req: any) {
    // TODO: Wire up to manifestationsService.findUserManifestations(req.user.userId)
    throw new NotImplementedException(
      'GET /api/manifestations/mine not implemented',
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get details of a manifestation (must belong to the protest)',
  })
  findOne(@Param('id') id: string, @Req() req: any) {
    // TODO: Wire up to manifestationsService.findOneForMember(id, req.user.userId)
    throw new NotImplementedException(
      'GET /api/manifestations/:id not implemented',
    );
  }

  @Delete(':id/leave')
  @ApiOperation({ summary: 'Leave a manifestation / protest' })
  leave(@Param('id') id: string, @Req() req: any) {
    // TODO: Wire up to manifestationsService.leave(id, req.user.userId)
    throw new NotImplementedException(
      'DELETE /api/manifestations/:id/leave not implemented',
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a manifestation (ONLY the organizer of this protest)',
  })
  remove(@Param('id') id: string, @Req() req: any) {
    // TODO: Wire up to manifestationsService.remove(id, req.user.userId)
    throw new NotImplementedException(
      'DELETE /api/manifestations/:id not implemented',
    );
  }
}
