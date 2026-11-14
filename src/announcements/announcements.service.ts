import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './entities/announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { ManifestationsService } from '../manifestations/manifestations.service';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementsRepository: Repository<Announcement>,
    private readonly manifestationsService: ManifestationsService,
  ) {}

  async create(
    userId: string,
    createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<Announcement> {
    // TODO: 1. Call manifestationsService.assertIsOrganizer(createAnnouncementDto.manifestationId, userId)
    //       2. Create and save announcement for that protest
    throw new NotImplementedException(
      'AnnouncementsService.create not implemented',
    );
  }

  async findByManifestation(
    manifestationId: string,
    userId: string,
  ): Promise<Announcement[]> {
    // TODO: 1. Call manifestationsService.assertIsMember(manifestationId, userId)
    //       2. Return ONLY announcements belonging to manifestationId ordered by latest first
    throw new NotImplementedException(
      'AnnouncementsService.findByManifestation not implemented',
    );
  }

  async update(
    id: string,
    userId: string,
    updateAnnouncementDto: UpdateAnnouncementDto,
  ): Promise<Announcement> {
    // TODO: 1. Find announcement by id
    //       2. Call manifestationsService.assertIsOrganizer(announcement.manifestationId, userId)
    //       3. Update and save announcement
    throw new NotImplementedException(
      'AnnouncementsService.update not implemented',
    );
  }

  async remove(id: string, userId: string): Promise<void> {
    // TODO: 1. Find announcement by id
    //       2. Call manifestationsService.assertIsOrganizer(announcement.manifestationId, userId)
    //       3. Delete announcement
    throw new NotImplementedException(
      'AnnouncementsService.remove not implemented',
    );
  }
}
