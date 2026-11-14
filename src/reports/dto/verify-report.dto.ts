import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ReportStatus } from '../entities/report.entity';

export class VerifyReportDto {
  @ApiProperty({
    enum: ReportStatus,
    example: ReportStatus.VERIFIED,
    description: 'Organizer review decision on a report with photo proof',
  })
  @IsEnum(ReportStatus)
  status: ReportStatus;
}
