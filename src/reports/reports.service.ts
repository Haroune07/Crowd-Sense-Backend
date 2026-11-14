import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { VerifyReportDto } from './dto/verify-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  async create(
    createReportDto: CreateReportDto,
    photoFilename?: string,
  ): Promise<Report> {
    // TODO: Implement saving report (location + dangerLevel + photoUrl)
    throw new NotImplementedException('ReportsService.create not implemented');
  }

  async findAll(): Promise<Report[]> {
    // TODO: Implement listing all reports
    throw new NotImplementedException('ReportsService.findAll not implemented');
  }

  async getHeatmapPoints(): Promise<
    Array<{ lat: number; lng: number; dangerLevel: number; verified: boolean }>
  > {
    // TODO: Implement heatmap point aggregation for the frontend map
    throw new NotImplementedException(
      'ReportsService.getHeatmapPoints not implemented',
    );
  }

  async findPendingReview(): Promise<Report[]> {
    // TODO: Implement fetching unverified urgency reports for organizers to review
    throw new NotImplementedException(
      'ReportsService.findPendingReview not implemented',
    );
  }

  async verifyReport(
    id: string,
    verifyReportDto: VerifyReportDto,
  ): Promise<Report> {
    // TODO: Implement organizer verification/dismissal of a report
    throw new NotImplementedException(
      'ReportsService.verifyReport not implemented',
    );
  }
}
