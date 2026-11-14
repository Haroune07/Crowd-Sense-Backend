import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotImplementedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Register a user session' })
  create(@Body() createUserDto: CreateUserDto) {
    // TODO: Wire up to usersService.create(createUserDto)
    throw new NotImplementedException('POST /api/users not implemented');
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  findAll() {
    // TODO: Wire up to usersService.findAll()
    throw new NotImplementedException('GET /api/users not implemented');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single user profile' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
