import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poll } from './entities/poll.entity';
import { Vote } from './entities/vote.entity';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { CastVoteDto } from './dto/cast-vote.dto';
import { ManifestationsService } from '../manifestations/manifestations.service';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollsRepository: Repository<Poll>,
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
    private readonly manifestationsService: ManifestationsService,
  ) {}

  async createPoll(
    userId: string,
    createPollDto: CreatePollDto,
  ): Promise<Poll> {
    // TODO: 1. Call manifestationsService.assertIsOrganizer(createPollDto.manifestationId, userId)
    //       2. Create and save Poll scoped to manifestationId
    throw new NotImplementedException('VotesService.createPoll not implemented');
  }

  async findPollsByManifestation(
    manifestationId: string,
    userId: string,
  ): Promise<any[]> {
    // TODO: 1. Call manifestationsService.assertIsMember(manifestationId, userId)
    //       2. Return ONLY polls & vote tallies belonging to manifestationId
    throw new NotImplementedException(
      'VotesService.findPollsByManifestation not implemented',
    );
  }

  async updatePoll(
    pollId: string,
    userId: string,
    updatePollDto: UpdatePollDto,
  ): Promise<Poll> {
    // TODO: 1. Find poll by pollId
    //       2. Call manifestationsService.assertIsOrganizer(poll.manifestationId, userId)
    //       3. Update and save poll
    throw new NotImplementedException('VotesService.updatePoll not implemented');
  }

  async deletePoll(pollId: string, userId: string): Promise<void> {
    // TODO: 1. Find poll by pollId
    //       2. Call manifestationsService.assertIsOrganizer(poll.manifestationId, userId)
    //       3. Delete poll and its associated votes
    throw new NotImplementedException('VotesService.deletePoll not implemented');
  }

  async castVote(
    pollId: string,
    userId: string,
    castVoteDto: CastVoteDto,
  ): Promise<Vote> {
    // TODO: 1. Find poll by pollId
    //       2. Call manifestationsService.assertIsMember(poll.manifestationId, userId)
    //       3. Record user's vote for pollId
    throw new NotImplementedException('VotesService.castVote not implemented');
  }
}
