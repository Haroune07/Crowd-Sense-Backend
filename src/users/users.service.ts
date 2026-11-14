import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UserRole } from '../common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Always create as PROTESTER regardless of incoming DTO role
    const user = this.usersRepository.create({
      displayName: createUserDto.displayName,
      role: UserRole.PROTESTER,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .getOne();
  }

  async createWithPassword(data: {
    displayName: string;
    email: string;
    passwordHash: string;
    role?: UserRole;
    manifestationId?: string | null;
  }): Promise<User> {
    const user = this.usersRepository.create({
      displayName: data.displayName,
      email: data.email.toLowerCase(),
      passwordHash: data.passwordHash,
      role: data.role ?? UserRole.PROTESTER,
      manifestationId: data.manifestationId ?? null,
    });
    const saved = await this.usersRepository.save(user);
    delete saved.passwordHash;
    return saved;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<User> {
    const user = await this.findOne(id);
    user.role = updateRoleDto.role;
    return this.usersRepository.save(user);
  }

  async updateManifestationAndRole(
    userId: string,
    manifestationId: string | null,
    role: UserRole,
  ): Promise<User> {
    const user = await this.findOne(userId);
    user.manifestationId = manifestationId;
    user.role = role;
    return this.usersRepository.save(user);
  }

  async findOrCreateGoogleUser(data: {
    email: string;
    displayName: string;
  }): Promise<User> {
    let user = await this.findByEmail(data.email);
    if (!user) {
      user = this.usersRepository.create({
        email: data.email.toLowerCase(),
        displayName: data.displayName,
        role: UserRole.PROTESTER,
      });
      user = await this.usersRepository.save(user);
    }
    return user;
  }
}
