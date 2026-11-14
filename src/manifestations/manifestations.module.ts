import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manifestation } from './entities/manifestation.entity';
import { ManifestationMember } from './entities/manifestation-member.entity';
import { ManifestationsService } from './manifestations.service';
import { ManifestationsController } from './manifestations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Manifestation, ManifestationMember])],
  controllers: [ManifestationsController],
  providers: [ManifestationsService],
  exports: [ManifestationsService],
})
export class ManifestationsModule {}
