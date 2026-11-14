import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { basename, join } from 'path';
import { Report, ReportStatus } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { VerifyReportDto } from './dto/verify-report.dto';
import { VerifyManyReportsDto } from './dto/verify-many-reports.dto';
import { ManifestationsService } from '../manifestations/manifestations.service';

export interface PendingZoneGroup {
  zoneKey: string;
  lat: number;
  lng: number;
  count: number;
  maxDanger: number;
  latestAt: Date;
  reports: Report[];
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    private readonly manifestationsService: ManifestationsService,
  ) {}

  private roundCoord(value: number): number {
    return Math.round(value * 1000) / 1000;
  }

  private async deletePhotoFileIfPresent(photoUrl?: string | null): Promise<void> {
    if (!photoUrl) {
      return;
    }
    try {
      const filename = basename(photoUrl);
      const filePath = join(process.cwd(), 'uploads', filename);
      await fs.unlink(filePath);
    } catch {
      // Ignore if file was already removed or missing
    }
  }

  async create(
    createReportDto: CreateReportDto,
    photoFilename?: string,
    reqUser?: { userId?: string; manifestationId?: string | null },
  ): Promise<Report> {
    const manifestationId =
      await this.manifestationsService.resolveEffectiveManifestationId(reqUser);

    const report = this.reportsRepository.create({
      userId: reqUser?.userId ?? createReportDto.userId ?? null,
      manifestationId,
      lat: createReportDto.lat,
      lng: createReportDto.lng,
      dangerLevel: createReportDto.dangerLevel,
      description: createReportDto.description ?? null,
      photoUrl: photoFilename ? `/uploads/${photoFilename}` : null,
      status: ReportStatus.PENDING_REVIEW,
      verifiedAt: null,
    });

    return this.reportsRepository.save(report);
  }

  async findAll(reqUser?: {
    userId?: string;
    manifestationId?: string | null;
  }): Promise<Report[]> {
    const manifestationId =
      await this.manifestationsService.resolveEffectiveManifestationId(reqUser);

    const where = manifestationId ? { manifestationId } : {};
    return this.reportsRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async getHeatmapPoints(reqUser?: {
    userId?: string;
    manifestationId?: string | null;
  }): Promise<
    Array<{ lat: number; lng: number; dangerLevel: number; verified: boolean }>
  > {
    const manifestationId =
      await this.manifestationsService.resolveEffectiveManifestationId(reqUser);

    const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);
    const whereClause: any = {
      status: ReportStatus.VERIFIED,
      verifiedAt: MoreThanOrEqual(twentyMinutesAgo),
    };
    if (manifestationId) {
      whereClause.manifestationId = manifestationId;
    }

    const verifiedReports = await this.reportsRepository.find({
      where: whereClause,
      order: { verifiedAt: 'DESC' },
    });

    // Privacy rule: round lat/lng to 3 decimals (~100m) and never expose photoUrl, userId, or description
    return verifiedReports.map((r) => ({
      lat: this.roundCoord(r.lat),
      lng: this.roundCoord(r.lng),
      dangerLevel: r.dangerLevel,
      verified: true,
    }));
  }

  async findPendingReview(reqUser?: {
    userId?: string;
    manifestationId?: string | null;
  }): Promise<PendingZoneGroup[]> {
    const manifestationId =
      await this.manifestationsService.resolveEffectiveManifestationId(reqUser);

    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const whereClause: any = {
      status: ReportStatus.PENDING_REVIEW,
      createdAt: MoreThanOrEqual(fifteenMinutesAgo),
    };
    if (manifestationId) {
      whereClause.manifestationId = manifestationId;
    }

    const pendingReports = await this.reportsRepository.find({
      where: whereClause,
      order: { createdAt: 'DESC' },
    });

    const zonesMap = new Map<string, PendingZoneGroup>();

    for (const report of pendingReports) {
      const roundedLat = this.roundCoord(report.lat);
      const roundedLng = this.roundCoord(report.lng);
      const zoneKey = `${roundedLat.toFixed(3)},${roundedLng.toFixed(3)}`;

      const existing = zonesMap.get(zoneKey);
      if (!existing) {
        zonesMap.set(zoneKey, {
          zoneKey,
          lat: roundedLat,
          lng: roundedLng,
          count: 1,
          maxDanger: report.dangerLevel,
          latestAt: report.createdAt,
          reports: [report],
        });
      } else {
        existing.count += 1;
        if (report.dangerLevel > existing.maxDanger) {
          existing.maxDanger = report.dangerLevel;
        }
        if (
          new Date(report.createdAt).getTime() >
          new Date(existing.latestAt).getTime()
        ) {
          existing.latestAt = report.createdAt;
        }
        existing.reports.push(report);
      }
    }

    const zones = Array.from(zonesMap.values());
    zones.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      if (b.maxDanger !== a.maxDanger) {
        return b.maxDanger - a.maxDanger;
      }
      return new Date(b.latestAt).getTime() - new Date(a.latestAt).getTime();
    });

    return zones;
  }

  async verifyReport(
    id: string,
    verifyReportDto: VerifyReportDto,
  ): Promise<Report> {
    const report = await this.reportsRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException(`Report ${id} not found`);
    }

    await this.deletePhotoFileIfPresent(report.photoUrl);

    report.status = verifyReportDto.status;
    report.photoUrl = null;
    report.verifiedAt =
      verifyReportDto.status === ReportStatus.VERIFIED ? new Date() : null;

    return this.reportsRepository.save(report);
  }

  async verifyManyReports(
    verifyManyDto: VerifyManyReportsDto,
  ): Promise<{ updated: number; reports: Report[] }> {
    const reports = await this.reportsRepository.find({
      where: { id: In(verifyManyDto.ids) },
    });

    const now =
      verifyManyDto.status === ReportStatus.VERIFIED ? new Date() : null;

    for (const report of reports) {
      await this.deletePhotoFileIfPresent(report.photoUrl);
      report.status = verifyManyDto.status;
      report.photoUrl = null;
      report.verifiedAt = now;
    }

    const saved = await this.reportsRepository.save(reports);
    return {
      updated: saved.length,
      reports: saved,
    };
  }
}
