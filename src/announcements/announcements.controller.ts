import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  NotImplementedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

@ApiTags('Announcements (Annonce)')
@Controller('announcements')
@UseGuards(RolesGuard)
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @Roles(UserRole.ORGANIZER, UserRole.MEDIC)
  @ApiOperation({ summary: 'Broadcast a new announcement to protesters' })
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    // TODO: Wire up to announcementsService.create(createAnnouncementDto)
    throw new NotImplementedException('POST /api/announcements not implemented');
  }

  @Get()
  @ApiOperation({ summary: 'Get feed of all announcements' })
  findAll() {
    // TODO: Wire up to announcementsService.findAll()
    throw new NotImplementedException('GET /api/announcements not implemented');
  }

  @Delete(':id')
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: 'Delete an outdated announcement' })
  remove(@Param('id') id: string) {
    // TODO: Wire up to announcementsService.remove(id)
    throw new NotImplementedException(
      'DELETE /api/announcements/:id not implemented',
    );
  }
}
