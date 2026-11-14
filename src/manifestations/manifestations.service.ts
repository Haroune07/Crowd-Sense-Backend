import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manifestation } from './entities/manifestation.entity';
import { CreateManifestationDto } from './dto/create-manifestation.dto';
import { JoinManifestationDto } from './dto/join-manifestation.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../common/enums/role.enum';

@Injectable()
export class ManifestationsService {
  private static readonly CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  constructor(
    @InjectRepository(Manifestation)
    private readonly manifestationsRepository: Repository<Manifestation>,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  private async generateUniqueCode(): Promise<string> {
    for (let attempt = 0; attempt < 20; attempt++) {
      let code = '';
      for (let i = 0; i < 6; i++) {
        const idx = Math.floor(
          Math.random() * ManifestationsService.CODE_CHARS.length,
        );
        code += ManifestationsService.CODE_CHARS[idx];
      }
      const exists = await this.manifestationsRepository.findOne({
        where: { code },
      });
      if (!exists) {
        return code;
      }
    }
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async create(userId: string, dto: CreateManifestationDto) {
    const code = await this.generateUniqueCode();
    const manifestation = this.manifestationsRepository.create({
      name: dto.name,
      description: dto.description ?? null,
      startsAt: new Date(dto.startsAt),
      meetingLat: dto.meetingLat,
      meetingLng: dto.meetingLng,
      code,
      organizerId: userId,
    });
    const saved = await this.manifestationsRepository.save(manifestation);

    const updatedUser = await this.usersService.updateManifestationAndRole(
      userId,
      saved.id,
      UserRole.ORGANIZER,
    );
    const accessToken = await this.authService.signTokenForUser(updatedUser);

    return {
      manifestation: saved,
      accessToken,
      user: updatedUser,
    };
  }

  async join(userId: string, dto: JoinManifestationDto) {
    const normalizedCode = dto.code.trim().toUpperCase();
    const manifestation = await this.manifestationsRepository
      .createQueryBuilder('m')
      .where('UPPER(m.code) = :code', { code: normalizedCode })
      .getOne();

    if (!manifestation) {
      throw new NotFoundException(
        `Manifestation with code "${dto.code}" not found`,
      );
    }

    const role =
      manifestation.organizerId === userId
        ? UserRole.ORGANIZER
        : UserRole.PROTESTER;

    const updatedUser = await this.usersService.updateManifestationAndRole(
      userId,
      manifestation.id,
      role,
    );
    const accessToken = await this.authService.signTokenForUser(updatedUser);

    const responseManifestation: Partial<Manifestation> = { ...manifestation };
    if (role !== UserRole.ORGANIZER) {
      delete responseManifestation.code;
    }

    return {
      manifestation: responseManifestation,
      accessToken,
      user: updatedUser,
    };
  }

  async getCurrent(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user.manifestationId) {
      throw new NotFoundException('User has not joined a manifestation');
    }

    const manifestation = await this.manifestationsRepository.findOne({
      where: { id: user.manifestationId },
    });
    if (!manifestation) {
      throw new NotFoundException('Current manifestation no longer exists');
    }

    const result: Partial<Manifestation> = { ...manifestation };
    if (
      user.role !== UserRole.ORGANIZER &&
      manifestation.organizerId !== user.id
    ) {
      delete result.code;
    }
    return result;
  }

  async leave(userId: string) {
    const updatedUser = await this.usersService.updateManifestationAndRole(
      userId,
      null,
      UserRole.PROTESTER,
    );
    const accessToken = await this.authService.signTokenForUser(updatedUser);
    return {
      accessToken,
      user: updatedUser,
    };
  }

  async resolveEffectiveManifestationId(reqUser?: {
    userId?: string;
    manifestationId?: string | null;
  }): Promise<string | null> {
    if (reqUser?.userId) {
      try {
        const dbUser = await this.usersService.findOne(reqUser.userId);
        if (dbUser.manifestationId) {
          return dbUser.manifestationId;
        }
      } catch {
        // Ignore if user lookup fails
      }
    }
    if (reqUser?.manifestationId) {
      return reqUser.manifestationId;
    }

    // Fallback to latest/seeded manifestation for unauthenticated demo requests
    const latest = await this.manifestationsRepository.find({
      order: { createdAt: 'ASC' },
      take: 1,
    });
    return latest[0]?.id ?? null;
  }
}
