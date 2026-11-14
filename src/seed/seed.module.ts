import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Manifestation } from '../manifestations/entities/manifestation.entity';
import { Report } from '../reports/entities/report.entity';
import { Announcement } from '../announcements/entities/announcement.entity';
import { Poll } from '../votes/entities/poll.entity';
import { Vote } from '../votes/entities/vote.entity';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Manifestation,
      Report,
      Announcement,
      Poll,
      Vote,
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
