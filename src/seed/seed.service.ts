import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { Manifestation } from '../manifestations/entities/manifestation.entity';
import { Report, ReportStatus } from '../reports/entities/report.entity';
import {
  Announcement,
  AnnouncementSeverity,
} from '../announcements/entities/announcement.entity';
import { Poll } from '../votes/entities/poll.entity';
import { Vote } from '../votes/entities/vote.entity';
import { UserRole } from '../common/enums/role.enum';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Manifestation)
    private readonly manifestationsRepository: Repository<Manifestation>,
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    @InjectRepository(Announcement)
    private readonly announcementsRepository: Repository<Announcement>,
    @InjectRepository(Poll)
    private readonly pollsRepository: Repository<Poll>,
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
  ) {}

  async onModuleInit() {
    await this.runSeed(false);
  }

  async runSeed(forceReset = false) {
    const organizerEmail = (
      process.env.SEED_ORGANIZER_EMAIL || 'organizer@crowdsense.org'
    ).toLowerCase();
    const organizerPassword =
      process.env.SEED_ORGANIZER_PASSWORD || 'organizer123';
    const manifCode = (process.env.SEED_MANIF_CODE || 'CEGEP1')
      .trim()
      .toUpperCase();

    // 1. Ensure demo organizer user exists
    let organizer = await this.usersRepository.findOne({
      where: { email: organizerEmail },
    });
    const passwordHash = await bcrypt.hash(organizerPassword, 10);

    if (!organizer) {
      organizer = this.usersRepository.create({
        displayName: 'Comité Mobilisation CÉGEP',
        email: organizerEmail,
        passwordHash,
        role: UserRole.ORGANIZER,
      });
      organizer = await this.usersRepository.save(organizer);
    } else {
      organizer.role = UserRole.ORGANIZER;
      organizer.passwordHash = passwordHash;
      organizer = await this.usersRepository.save(organizer);
    }

    // 2. Ensure demo manifestation with SEED_MANIF_CODE exists
    let manifestation = await this.manifestationsRepository.findOne({
      where: { code: manifCode },
    });

    if (!manifestation) {
      manifestation = this.manifestationsRepository.create({
        name: 'Grande Marche Étudiante Inter-CÉGEP',
        description:
          'Départ de la Place Émilie-Gamelin vers le centre-ville. Restez groupés et suivez les annonces.',
        startsAt: new Date(),
        meetingLat: 45.515,
        meetingLng: -73.56,
        code: manifCode,
        organizerId: organizer.id,
      });
      manifestation = await this.manifestationsRepository.save(manifestation);
    }

    if (organizer.manifestationId !== manifestation.id) {
      organizer.manifestationId = manifestation.id;
      await this.usersRepository.save(organizer);
    }

    // 3. Seed demo reports, announcements, and poll if empty (or if forceReset=true)
    const reportCount = await this.reportsRepository.count();

    if (forceReset) {
      await this.reportsRepository.delete({
        manifestationId: manifestation.id,
      });
      await this.announcementsRepository.delete({
        manifestationId: manifestation.id,
      });
      await this.pollsRepository.delete({
        manifestationId: manifestation.id,
      });
    }

    const now = new Date();

    if (reportCount === 0 || forceReset) {
      const demoReports = [
        // Peaceful march points (green / calm)
        {
          manifestationId: manifestation.id,
          userId: organizer.id,
          lat: 45.515,
          lng: -73.56,
          dangerLevel: 1,
          status: ReportStatus.VERIFIED,
          verifiedAt: now,
        },
        {
          manifestationId: manifestation.id,
          userId: organizer.id,
          lat: 45.514,
          lng: -73.562,
          dangerLevel: 1,
          status: ReportStatus.VERIFIED,
          verifiedAt: now,
        },
        {
          manifestationId: manifestation.id,
          userId: organizer.id,
          lat: 45.512,
          lng: -73.564,
          dangerLevel: 2,
          status: ReportStatus.VERIFIED,
          verifiedAt: now,
        },
        // Tension / hot zone ahead (orange/red)
        {
          manifestationId: manifestation.id,
          userId: organizer.id,
          lat: 45.509,
          lng: -73.567,
          dangerLevel: 4,
          status: ReportStatus.VERIFIED,
          verifiedAt: now,
        },
        {
          manifestationId: manifestation.id,
          userId: organizer.id,
          lat: 45.508,
          lng: -73.568,
          dangerLevel: 5,
          status: ReportStatus.VERIFIED,
          verifiedAt: now,
        },
        {
          manifestationId: manifestation.id,
          userId: organizer.id,
          lat: 45.5082,
          lng: -73.5681,
          dangerLevel: 5,
          status: ReportStatus.VERIFIED,
          verifiedAt: now,
        },
      ];

      await this.reportsRepository.save(
        demoReports.map((r) => this.reportsRepository.create(r)),
      );

      // 2 Demo Announcements (pinned to map coordinates)
      const demoAnnouncements = [
        this.announcementsRepository.create({
          authorId: organizer.id,
          manifestationId: manifestation.id,
          title: 'Barrage policier - Évitez Sainte-Catherine / Jeanne-Mance',
          message:
            'Zone rouge confirmée devant la Place des Arts. Bifurquez vers le nord sur Sherbrooke.',
          severity: AnnouncementSeverity.URGENT,
          lat: 45.508,
          lng: -73.568,
        }),
        this.announcementsRepository.create({
          authorId: organizer.id,
          manifestationId: manifestation.id,
          title: 'Point d’eau et premiers soins à Émilie-Gamelin',
          message:
            'L’équipe médicale étudiante est présente près de la sortie Berri-UQAM.',
          severity: AnnouncementSeverity.INFO,
          lat: 45.515,
          lng: -73.56,
        }),
      ];
      await this.announcementsRepository.save(demoAnnouncements);

      // 1 Demo Poll with initial votes
      const demoPoll = await this.pollsRepository.save(
        this.pollsRepository.create({
          manifestationId: manifestation.id,
          question:
            'La rue Sainte-Catherine est bloquée. Quelle direction prend le cortège ?',
          options: [
            'Remonter vers la rue Sherbrooke',
            'Rester sur place en sit-in pacifique',
            'Retourner vers Berri-UQAM',
          ],
          isActive: true,
        }),
      );

      await this.votesRepository.save([
        this.votesRepository.create({
          pollId: demoPoll.id,
          userId: 'demo-voter-1',
          optionIndex: 0,
        }),
        this.votesRepository.create({
          pollId: demoPoll.id,
          userId: 'demo-voter-2',
          optionIndex: 0,
        }),
        this.votesRepository.create({
          pollId: demoPoll.id,
          userId: 'demo-voter-3',
          optionIndex: 1,
        }),
      ]);

      this.logger.log(
        `Seeded demo protest "${manifestation.name}" (code: ${manifestation.code}) and organizer (${organizerEmail})`,
      );
    } else {
      // Refresh verifiedAt on existing verified reports so demo heatmap never starts empty after restart
      await this.reportsRepository
        .createQueryBuilder()
        .update(Report)
        .set({ verifiedAt: now })
        .where('status = :status', { status: ReportStatus.VERIFIED })
        .execute();

      this.logger.log(
        `Refreshed verifiedAt timestamps for existing verified reports (protest code: ${manifestation.code})`,
      );
    }

    return {
      seeded: true,
      manifestationCode: manifestation.code,
      manifestationId: manifestation.id,
      organizerEmail,
    };
  }
}
