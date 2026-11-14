import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  NotImplementedException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { VerifyReportDto } from './dto/verify-report.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

@ApiTags('HeatMap & Urgence Reports')
@Controller('reports')
@UseGuards(RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiOperation({
    summary:
      'Submit status / Urgence button (current location, danger level, optional photo proof)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['lat', 'lng', 'dangerLevel'],
      properties: {
        userId: { type: 'string' },
        lat: { type: 'number', example: 45.5017 },
        lng: { type: 'number', example: -73.5673 },
        dangerLevel: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
        description: { type: 'string' },
        photo: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('photo', {
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
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    // TODO: Wire up to reportsService.create(createReportDto, photo?.filename)
    throw new NotImplementedException('POST /api/reports not implemented');
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports with coordinates and photos' })
  findAll() {
    // TODO: Wire up to reportsService.findAll()
    throw new NotImplementedException('GET /api/reports not implemented');
  }

  @Get('heatmap')
  @ApiOperation({
    summary:
      'Get HeatMap points (lat, lng, dangerosity/pacificity level) for the map',
  })
  getHeatmapPoints() {
    // TODO: Wire up to reportsService.getHeatmapPoints()
    throw new NotImplementedException(
      'GET /api/reports/heatmap not implemented',
    );
  }

  @Get('pending')
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({
    summary:
      'List pending urgency photo reports waiting for organizer revision',
  })
  findPendingReview() {
    // TODO: Wire up to reportsService.findPendingReview()
    throw new NotImplementedException(
      'GET /api/reports/pending not implemented',
    );
  }

  @Patch(':id/verify')
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({
    summary: 'Organizer revises/approves or dismisses an urgency photo report',
  })
  verifyReport(
    @Param('id') id: string,
    @Body() verifyReportDto: VerifyReportDto,
  ) {
    // TODO: Wire up to reportsService.verifyReport(id, verifyReportDto)
    throw new NotImplementedException(
      'PATCH /api/reports/:id/verify not implemented',
    );
  }
}
