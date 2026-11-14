import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VotesService } from './votes.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { CastVoteDto } from './dto/cast-vote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

@ApiTags('Votes & Polls')
@Controller('polls')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: 'Create a new community poll (Organizer only)' })
  createPoll(@Req() req: any, @Body() createPollDto: CreatePollDto) {
    return this.votesService.createPoll(createPollDto, req.user);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary:
      "List polls for the user's protest with a counts array (one count per option)",
  })
  findAllPolls(@Req() req: any) {
    return this.votesService.findAllPolls(req.user);
  }

  @Post(':id/vote')
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary:
      'Cast a vote on an active poll (400 if closed/invalid option, 409 if already voted)',
  })
  castVote(
    @Param('id') id: string,
    @Req() req: any,
    @Body() castVoteDto: CastVoteDto,
  ) {
    return this.votesService.castVote(id, castVoteDto, req.user);
  }

  @Patch(':id/close')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: 'Close a poll (Organizer only)' })
  closePoll(@Param('id') id: string) {
    return this.votesService.closePoll(id);
  }
}
