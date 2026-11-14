import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './entities/announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementsRepository: Repository<Announcement>,
  ) {}

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<Announcement> {
    // TODO: Implement creating an organizer/medic announcement
    throw new NotImplementedException(
      'AnnouncementsService.create not implemented',
    );
  }

  async findAll(): Promise<Announcement[]> {
    // TODO: Implement listing announcements ordered by latest first
    throw new NotImplementedException(
      'AnnouncementsService.findAll not implemented',
    );
  }

  async remove(id: string): Promise<void> {
    // TODO: Implement deleting an announcement
    throw new NotImplementedException(
      'AnnouncementsService.remove not implemented',
    );
  }
}
