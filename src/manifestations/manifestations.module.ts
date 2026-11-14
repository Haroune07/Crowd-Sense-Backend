import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manifestation } from './entities/manifestation.entity';
import { ManifestationsService } from './manifestations.service';
import { ManifestationsController } from './manifestations.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manifestation]),
    UsersModule,
    AuthModule,
  ],
  controllers: [ManifestationsController],
  providers: [ManifestationsService],
  exports: [ManifestationsService],
})
export class ManifestationsModule {}
