import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // TODO: Implement user creation
    throw new NotImplementedException('UsersService.create not implemented');
  }

  async findAll(): Promise<User[]> {
    // TODO: Implement fetching all users
    throw new NotImplementedException('UsersService.findAll not implemented');
  }

  async findOne(id: string): Promise<User> {
    // TODO: Implement fetching single user by id
    throw new NotImplementedException('UsersService.findOne not implemented');
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<User> {
    // TODO: Implement updating user role (protester | medic | organizer)
    throw new NotImplementedException('UsersService.updateRole not implemented');
  }
}
