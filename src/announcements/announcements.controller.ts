import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  Req,
  UseGuards,
  NotImplementedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Announcements (Protest-Scoped)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @ApiOperation({
    summary:
      'Create a new announcement for a protest (ONLY the organizer of that protest)',
  })
  create(
    @Req() req: any,
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ) {
    // TODO: Wire up to announcementsService.create(req.user.userId, createAnnouncementDto)
    throw new NotImplementedException('POST /api/announcements not implemented');
  }

  @Get()
  @ApiQuery({
    name: 'manifestationId',
    required: true,
    description: 'ID of the protest/manifestation the user belongs to',
  })
  @ApiOperation({
    summary:
      'Get announcements ONLY for the specified protest (must belong to the protest)',
  })
  findByManifestation(
    @Query('manifestationId') manifestationId: string,
    @Req() req: any,
  ) {
    // TODO: Wire up to announcementsService.findByManifestation(manifestationId, req.user.userId)
    throw new NotImplementedException('GET /api/announcements not implemented');
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modify an announcement (ONLY the organizer of that protest)',
  })
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    // TODO: Wire up to announcementsService.update(id, req.user.userId, updateAnnouncementDto)
    throw new NotImplementedException(
      'PATCH /api/announcements/:id not implemented',
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an announcement (ONLY the organizer of that protest)',
  })
  remove(@Param('id') id: string, @Req() req: any) {
    // TODO: Wire up to announcementsService.remove(id, req.user.userId)
    throw new NotImplementedException(
      'DELETE /api/announcements/:id not implemented',
    );
  }
}
