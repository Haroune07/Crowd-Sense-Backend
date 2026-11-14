import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Vote } from './entities/vote.entity';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { ManifestationsModule } from '../manifestations/manifestations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, Vote]), ManifestationsModule],
  controllers: [VotesController],
  providers: [VotesService],
  exports: [VotesService],
})
export class VotesModule {}
