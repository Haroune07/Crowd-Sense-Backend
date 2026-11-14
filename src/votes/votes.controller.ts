import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  NotImplementedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VotesService } from './votes.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { CastVoteDto } from './dto/cast-vote.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

@ApiTags('Votes & Polls')
@Controller('polls')
@UseGuards(RolesGuard)
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: 'Create a new community poll (Organizer)' })
  createPoll(@Body() createPollDto: CreatePollDto) {
    // TODO: Wire up to votesService.createPoll(createPollDto)
    throw new NotImplementedException('POST /api/polls not implemented');
  }

  @Get()
  @ApiOperation({ summary: 'List all polls and their current vote counts' })
  findAllPolls() {
    // TODO: Wire up to votesService.findAllPolls()
    throw new NotImplementedException('GET /api/polls not implemented');
  }

  @Post(':id/vote')
  @ApiOperation({ summary: 'Cast a vote on an active poll' })
  castVote(@Param('id') id: string, @Body() castVoteDto: CastVoteDto) {
    // TODO: Wire up to votesService.castVote(id, castVoteDto)
    throw new NotImplementedException('POST /api/polls/:id/vote not implemented');
  }

  @Patch(':id/close')
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: 'Close a poll (Organizer)' })
  closePoll(@Param('id') id: string) {
    // TODO: Wire up to votesService.closePoll(id)
    throw new NotImplementedException(
      'PATCH /api/polls/:id/close not implemented',
    );
  }
}
