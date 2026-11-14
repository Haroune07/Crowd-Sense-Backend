import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { VerifyReportDto } from './dto/verify-report.dto';
import { ManifestationsService } from '../manifestations/manifestations.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    private readonly manifestationsService: ManifestationsService,
  ) {}

  async create(
    userId: string,
    createReportDto: CreateReportDto,
    photoFilename?: string,
  ): Promise<Report> {
    // TODO: 1. Call manifestationsService.assertIsMember(createReportDto.manifestationId, userId)
    //       2. Save report (location + dangerLevel + photoUrl) scoped to manifestationId
    throw new NotImplementedException('ReportsService.create not implemented');
  }

  async findByManifestation(
    manifestationId: string,
    userId: string,
  ): Promise<Report[]> {
    // TODO: 1. Call manifestationsService.assertIsMember(manifestationId, userId)
    //       2. Return ONLY reports belonging to manifestationId
    throw new NotImplementedException(
      'ReportsService.findByManifestation not implemented',
    );
  }

  async getHeatmapPoints(
    manifestationId: string,
    userId: string,
  ): Promise<
    Array<{ lat: number; lng: number; dangerLevel: number; verified: boolean }>
  > {
    // TODO: 1. Call manifestationsService.assertIsMember(manifestationId, userId)
    //       2. Return heatmap points ONLY for manifestationId
    throw new NotImplementedException(
      'ReportsService.getHeatmapPoints not implemented',
    );
  }

  async findPendingReview(
    manifestationId: string,
    userId: string,
  ): Promise<Report[]> {
    // TODO: 1. Call manifestationsService.assertIsOrganizer(manifestationId, userId)
    //       2. Return unverified urgency photo reports for manifestationId
    throw new NotImplementedException(
      'ReportsService.findPendingReview not implemented',
    );
  }

  async verifyReport(
    id: string,
    userId: string,
    verifyReportDto: VerifyReportDto,
  ): Promise<Report> {
    // TODO: 1. Find report by id
    //       2. Call manifestationsService.assertIsOrganizer(report.manifestationId, userId)
    //       3. Update report status (verified | dismissed)
    throw new NotImplementedException(
      'ReportsService.verifyReport not implemented',
    );
  }

  async remove(id: string, userId: string): Promise<void> {
    // TODO: 1. Find report by id
    //       2. Call manifestationsService.assertIsOrganizer(report.manifestationId, userId)
    //       3. Delete report
    throw new NotImplementedException('ReportsService.remove not implemented');
  }
}
