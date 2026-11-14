import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Announcement,
  AnnouncementSeverity,
} from './entities/announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { ManifestationsService } from '../manifestations/manifestations.service';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementsRepository: Repository<Announcement>,
    private readonly manifestationsService: ManifestationsService,
  ) {}

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
    reqUser?: { userId?: string; manifestationId?: string | null },
  ): Promise<Announcement> {
    const manifestationId =
      await this.manifestationsService.resolveEffectiveManifestationId(reqUser);

    const announcement = this.announcementsRepository.create({
      authorId: reqUser?.userId ?? null,
      manifestationId,
      title: createAnnouncementDto.title,
      message: createAnnouncementDto.message,
      severity: createAnnouncementDto.severity ?? AnnouncementSeverity.INFO,
      lat: createAnnouncementDto.lat ?? null,
      lng: createAnnouncementDto.lng ?? null,
    });

    return this.announcementsRepository.save(announcement);
  }

  async findAll(reqUser?: {
    userId?: string;
    manifestationId?: string | null;
  }): Promise<Announcement[]> {
    const manifestationId =
      await this.manifestationsService.resolveEffectiveManifestationId(reqUser);

    const where = manifestationId ? { manifestationId } : {};
    return this.announcementsRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const announcement = await this.announcementsRepository.findOne({
      where: { id },
    });
    if (!announcement) {
      throw new NotFoundException(`Announcement ${id} not found`);
    }
    await this.announcementsRepository.remove(announcement);
    return { deleted: true };
  }
}
