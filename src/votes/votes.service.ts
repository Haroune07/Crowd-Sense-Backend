import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poll } from './entities/poll.entity';
import { Vote } from './entities/vote.entity';
import { CreatePollDto } from './dto/create-poll.dto';
import { CastVoteDto } from './dto/cast-vote.dto';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollsRepository: Repository<Poll>,
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
  ) {}

  async createPoll(createPollDto: CreatePollDto): Promise<Poll> {
    // TODO: Implement creating a poll
    throw new NotImplementedException('VotesService.createPoll not implemented');
  }

  async findAllPolls(): Promise<any[]> {
    // TODO: Implement listing polls along with vote counts per option
    throw new NotImplementedException(
      'VotesService.findAllPolls not implemented',
    );
  }

  async castVote(pollId: string, castVoteDto: CastVoteDto): Promise<Vote> {
    // TODO: Implement casting a vote on a poll
    throw new NotImplementedException('VotesService.castVote not implemented');
  }

  async closePoll(pollId: string): Promise<Poll> {
    // TODO: Implement closing a poll
    throw new NotImplementedException('VotesService.closePoll not implemented');
  }
}
