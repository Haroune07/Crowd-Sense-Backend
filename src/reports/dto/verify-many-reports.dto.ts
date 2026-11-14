import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsEnum, IsString } from 'class-validator';
import { ReportStatus } from '../entities/report.entity';

export class VerifyManyReportsDto {
  @ApiProperty({
    example: ['uuid-1', 'uuid-2'],
    description: 'Array of report IDs in a zone to verify or dismiss in one tap',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  ids: string[];

  @ApiProperty({
    enum: [ReportStatus.VERIFIED, ReportStatus.DISMISSED],
    example: ReportStatus.VERIFIED,
  })
  @IsEnum(ReportStatus)
  status: ReportStatus;
}
