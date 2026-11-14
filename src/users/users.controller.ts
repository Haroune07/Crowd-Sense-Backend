import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  NotImplementedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Users & Roles')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Register a user session with a role' })
  create(@Body() createUserDto: CreateUserDto) {
    // TODO: Wire up to usersService.create(createUserDto)
    throw new NotImplementedException('POST /api/users not implemented');
  }

  @Get()
  @ApiOperation({ summary: 'List all users and their roles' })
  findAll() {
    // TODO: Wire up to usersService.findAll()
    throw new NotImplementedException('GET /api/users not implemented');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single user profile & role' })
  findOne(@Param('id') id: string) {
    // TODO: Wire up to usersService.findOne(id)
    throw new NotImplementedException('GET /api/users/:id not implemented');
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Update user role (protester, medic, organizer)' })
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    // TODO: Wire up to usersService.updateRole(id, updateRoleDto)
    throw new NotImplementedException('PATCH /api/users/:id/role not implemented');
  }
}
