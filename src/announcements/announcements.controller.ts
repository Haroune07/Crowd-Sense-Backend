import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

@ApiTags('Announcements (Annonce)')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.MEDIC)
  @ApiOperation({
    summary:
      'Broadcast a new announcement to protesters (Organizer or Medic only; optional lat/lng pins it to the map)',
  })
  create(
    @Req() req: any,
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ) {
    return this.announcementsService.create(createAnnouncementDto, req.user);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary: "Get feed of announcements for the user's protest, newest first",
  })
  findAll(@Req() req: any) {
    return this.announcementsService.findAll(req.user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: 'Delete an outdated announcement (Organizer only)' })
  remove(@Param('id') id: string) {
    return this.announcementsService.remove(id);
  }
}
