import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Req,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { VerifyReportDto } from './dto/verify-report.dto';
import { VerifyManyReportsDto } from './dto/verify-many-reports.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

@ApiTags('HeatMap & Urgence Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary:
      'Submit status / Urgence button (current location, danger level, optional photo proof; max 5MB image/*)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['lat', 'lng', 'dangerLevel'],
      properties: {
        userId: { type: 'string' },
        lat: { type: 'number', example: 45.551 },
        lng: { type: 'number', example: -73.549 },
        dangerLevel: { type: 'integer', minimum: 1, maximum: 4, example: 4 },
        description: { type: 'string' },
        photo: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB limit
      },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype || !file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Only image/* files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const uniqueName = `${randomUUID()}${extname(file.originalname || '.jpg')}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  create(
    @Req() req: any,
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.reportsService.create(
      createReportDto,
      photo?.filename,
      req.user,
    );
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({
    summary: 'Get all reports for the protest (Organizer only)',
  })
  findAll(@Req() req: any) {
    return this.reportsService.findAll(req.user);
  }

  @Get('heatmap')
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({
    summary:
      'Get verified HeatMap points from the last 20 minutes (rounded to 3 decimals, no photoUrl/userId/description)',
  })
  getHeatmapPoints(@Req() req: any) {
    return this.reportsService.getHeatmapPoints(req.user);
  }

  @Get('pending')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({
    summary:
      'List pending urgency photo reports from the last 15 minutes grouped by ~100m zone (Organizer only)',
  })
  findPendingReview(@Req() req: any) {
    return this.reportsService.findPendingReview(req.user);
  }

  @Patch('verify-many')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({
    summary:
      'Verify or dismiss multiple reports in a zone at once and delete their photos from disk (Organizer only)',
  })
  verifyMany(@Body() verifyManyDto: VerifyManyReportsDto) {
    return this.reportsService.verifyManyReports(verifyManyDto);
  }

  @Patch(':id/verify')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({
    summary:
      'Organizer verifies or dismisses a single report and deletes its photo from disk',
  })
  verifyReport(
    @Param('id') id: string,
    @Body() verifyReportDto: VerifyReportDto,
  ) {
    return this.reportsService.verifyReport(id, verifyReportDto);
  }
}
