import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  Req,
  UseGuards,
  NotImplementedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { VotesService } from './votes.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { CastVoteDto } from './dto/cast-vote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Votes & Polls (Protest-Scoped)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('polls')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @ApiOperation({
    summary:
      'Create a new poll for a protest (ONLY the organizer of that protest)',
  })
  createPoll(@Req() req: any, @Body() createPollDto: CreatePollDto) {
    // TODO: Wire up to votesService.createPoll(req.user.userId, createPollDto)
    throw new NotImplementedException('POST /api/polls not implemented');
  }

  @Get()
  @ApiQuery({
    name: 'manifestationId',
    required: true,
    description: 'ID of the protest/manifestation the user belongs to',
  })
  @ApiOperation({
    summary:
      'List polls and vote tallies ONLY for the specified protest (must belong to the protest)',
  })
  findPollsByManifestation(
    @Query('manifestationId') manifestationId: string,
    @Req() req: any,
  ) {
    // TODO: Wire up to votesService.findPollsByManifestation(manifestationId, req.user.userId)
    throw new NotImplementedException('GET /api/polls not implemented');
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Modify a poll (question, options, active state — ONLY the organizer of that protest)',
  })
  updatePoll(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updatePollDto: UpdatePollDto,
  ) {
    // TODO: Wire up to votesService.updatePoll(id, req.user.userId, updatePollDto)
    throw new NotImplementedException('PATCH /api/polls/:id not implemented');
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a poll (ONLY the organizer of that protest)',
  })
  deletePoll(@Param('id') id: string, @Req() req: any) {
    // TODO: Wire up to votesService.deletePoll(id, req.user.userId)
    throw new NotImplementedException('DELETE /api/polls/:id not implemented');
  }

  @Post(':id/vote')
  @ApiOperation({
    summary: 'Cast a vote on an active poll (must belong to that protest)',
  })
  castVote(
    @Param('id') id: string,
    @Req() req: any,
    @Body() castVoteDto: CastVoteDto,
  ) {
    // TODO: Wire up to votesService.castVote(id, req.user.userId, castVoteDto)
    throw new NotImplementedException(
      'POST /api/polls/:id/vote not implemented',
    );
  }
}
