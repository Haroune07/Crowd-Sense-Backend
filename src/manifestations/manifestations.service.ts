import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manifestation } from './entities/manifestation.entity';
import { ManifestationMember } from './entities/manifestation-member.entity';
import { CreateManifestationDto } from './dto/create-manifestation.dto';
import { JoinManifestationDto } from './dto/join-manifestation.dto';

@Injectable()
export class ManifestationsService {
  constructor(
    @InjectRepository(Manifestation)
    private readonly manifestationsRepository: Repository<Manifestation>,
    @InjectRepository(ManifestationMember)
    private readonly membersRepository: Repository<ManifestationMember>,
  ) {}

  async create(
    userId: string,
    createManifestationDto: CreateManifestationDto,
  ): Promise<Manifestation> {
    // TODO: Create manifestation, generate unique joinToken (for MIO/Omnivox),
    // and add creator as ManifestationRole.ORGANIZER in ManifestationMember
    throw new NotImplementedException(
      'ManifestationsService.create not implemented',
    );
  }

  async joinByToken(
    userId: string,
    joinManifestationDto: JoinManifestationDto,
  ): Promise<ManifestationMember> {
    // TODO: Find manifestation by joinToken and add user as ManifestationRole.MANIFESTER
    throw new NotImplementedException(
      'ManifestationsService.joinByToken not implemented',
    );
  }

  async leave(manifestationId: string, userId: string): Promise<void> {
    // TODO: Remove user's membership from manifestation_members so they leave the protest
    throw new NotImplementedException(
      'ManifestationsService.leave not implemented',
    );
  }

  async findUserManifestations(userId: string): Promise<Manifestation[]> {
    // TODO: Return only the manifestations the user belongs to (as organizer or manifester)
    throw new NotImplementedException(
      'ManifestationsService.findUserManifestations not implemented',
    );
  }

  async findOneForMember(
    manifestationId: string,
    userId: string,
  ): Promise<Manifestation> {
    // TODO: Verify user belongs to manifestationId, then return manifestation details
    throw new NotImplementedException(
      'ManifestationsService.findOneForMember not implemented',
    );
  }

  async remove(manifestationId: string, userId: string): Promise<void> {
    // TODO: Verify user is ORGANIZER of manifestationId, then delete manifestation
    throw new NotImplementedException(
      'ManifestationsService.remove not implemented',
    );
  }

  async assertIsMember(manifestationId: string, userId: string): Promise<void> {
    // TODO: Throw ForbiddenException if userId is not in manifestation_members for manifestationId
    throw new NotImplementedException(
      'ManifestationsService.assertIsMember not implemented',
    );
  }

  async assertIsOrganizer(
    manifestationId: string,
    userId: string,
  ): Promise<void> {
    // TODO: Throw ForbiddenException if userId does not have role=ORGANIZER for manifestationId
    throw new NotImplementedException(
      'ManifestationsService.assertIsOrganizer not implemented',
    );
  }
}
