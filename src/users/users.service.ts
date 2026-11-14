import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
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
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findOrCreateGoogleUser(data: {
    email: string;
    displayName: string;
  }): Promise<User> {
    let user = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      user = this.usersRepository.create({
        email: data.email,
        displayName: data.displayName,
      });
      user = await this.usersRepository.save(user);
    }
    return user;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<User> {
    // TODO: Implement updating user role (protester | medic | organizer)
    throw new NotImplementedException('UsersService.updateRole not implemented');
  }
}
