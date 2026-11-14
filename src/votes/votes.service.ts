import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Poll } from './entities/poll.entity';
import { Vote } from './entities/vote.entity';
import { CreatePollDto } from './dto/create-poll.dto';
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
    createPollDto: CreatePollDto,
    reqUser?: { userId?: string; manifestationId?: string | null },
  ): Promise<Poll & { counts: number[] }> {
    const manifestationId =
      await this.manifestationsService.resolveEffectiveManifestationId(reqUser);

    const poll = this.pollsRepository.create({
      manifestationId,
      question: createPollDto.question,
      options: createPollDto.options,
      isActive: true,
    });
    const saved = await this.pollsRepository.save(poll);
    return {
      ...saved,
      counts: new Array(saved.options.length).fill(0),
    };
  }

  async findAllPolls(reqUser?: {
    userId?: string;
    manifestationId?: string | null;
  }): Promise<Array<Poll & { counts: number[] }>> {
    const manifestationId =
      await this.manifestationsService.resolveEffectiveManifestationId(reqUser);

    const where = manifestationId ? { manifestationId } : {};
    const polls = await this.pollsRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });

    if (polls.length === 0) {
      return [];
    }

    const pollIds = polls.map((p) => p.id);
    const votes = await this.votesRepository.find({
      where: { pollId: In(pollIds) },
    });

    return polls.map((poll) => {
      const counts = new Array(poll.options.length).fill(0);
      for (const vote of votes) {
        if (
          vote.pollId === poll.id &&
          vote.optionIndex >= 0 &&
          vote.optionIndex < counts.length
        ) {
          counts[vote.optionIndex] += 1;
        }
      }
      return {
        ...poll,
        counts,
      };
    });
  }

  async castVote(
    pollId: string,
    castVoteDto: CastVoteDto,
    reqUser?: { userId?: string },
  ): Promise<Vote> {
    const poll = await this.pollsRepository.findOne({ where: { id: pollId } });
    if (!poll || !poll.isActive) {
      throw new BadRequestException('Poll does not exist or is closed');
    }

    if (
      castVoteDto.optionIndex < 0 ||
      castVoteDto.optionIndex >= poll.options.length
    ) {
      throw new BadRequestException('optionIndex is out of bounds');
    }

    const effectiveUserId = reqUser?.userId ?? castVoteDto.userId;
    if (!effectiveUserId) {
      throw new BadRequestException('userId is required to vote');
    }

    const existingVote = await this.votesRepository.findOne({
      where: { pollId, userId: effectiveUserId },
    });
    if (existingVote) {
      throw new ConflictException('User has already voted on this poll');
    }

    const vote = this.votesRepository.create({
      pollId,
      userId: effectiveUserId,
      optionIndex: castVoteDto.optionIndex,
    });
    return this.votesRepository.save(vote);
  }

  async closePoll(pollId: string): Promise<Poll> {
    const poll = await this.pollsRepository.findOne({ where: { id: pollId } });
    if (!poll) {
      throw new NotFoundException(`Poll ${pollId} not found`);
    }
    poll.isActive = false;
    return this.pollsRepository.save(poll);
  }
}
