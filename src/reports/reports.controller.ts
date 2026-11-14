import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  Req,
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
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { VerifyReportDto } from './dto/verify-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('HeatMap & Urgence Reports (Protest-Scoped)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiOperation({
    summary:
      'Submit status / Urgence button for a protest (current location, danger level, optional photo proof)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['manifestationId', 'lat', 'lng', 'dangerLevel'],
      properties: {
        manifestationId: { type: 'string', example: 'manifestation-uuid-123' },
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
    @Req() req: any,
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    // TODO: Wire up to reportsService.create(req.user.userId, createReportDto, photo?.filename)
    throw new NotImplementedException('POST /api/reports not implemented');
  }

  @Get()
  @ApiQuery({
    name: 'manifestationId',
    required: true,
    description: 'ID of the protest/manifestation the user belongs to',
  })
  @ApiOperation({
    summary: 'Get reports ONLY for the specified protest (must belong to it)',
  })
  findByManifestation(
    @Query('manifestationId') manifestationId: string,
    @Req() req: any,
  ) {
    // TODO: Wire up to reportsService.findByManifestation(manifestationId, req.user.userId)
    throw new NotImplementedException('GET /api/reports not implemented');
  }

  @Get('heatmap')
  @ApiQuery({
    name: 'manifestationId',
    required: true,
    description: 'ID of the protest/manifestation the user belongs to',
  })
  @ApiOperation({
    summary:
      'Get HeatMap points (lat, lng, dangerosity/pacificity level) ONLY for the specified protest',
  })
  getHeatmapPoints(
    @Query('manifestationId') manifestationId: string,
    @Req() req: any,
  ) {
    // TODO: Wire up to reportsService.getHeatmapPoints(manifestationId, req.user.userId)
    throw new NotImplementedException(
      'GET /api/reports/heatmap not implemented',
    );
  }

  @Get('pending')
  @ApiQuery({
    name: 'manifestationId',
    required: true,
    description: 'ID of the protest/manifestation',
  })
  @ApiOperation({
    summary:
      'List pending urgency photo reports waiting for review (ONLY organizer of that protest)',
  })
  findPendingReview(
    @Query('manifestationId') manifestationId: string,
    @Req() req: any,
  ) {
    // TODO: Wire up to reportsService.findPendingReview(manifestationId, req.user.userId)
    throw new NotImplementedException(
      'GET /api/reports/pending not implemented',
    );
  }

  @Patch(':id/verify')
  @ApiOperation({
    summary:
      'Approve or dismiss an urgency photo report (ONLY organizer of that protest)',
  })
  verifyReport(
    @Param('id') id: string,
    @Req() req: any,
    @Body() verifyReportDto: VerifyReportDto,
  ) {
    // TODO: Wire up to reportsService.verifyReport(id, req.user.userId, verifyReportDto)
    throw new NotImplementedException(
      'PATCH /api/reports/:id/verify not implemented',
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a report (ONLY organizer of that protest)',
  })
  remove(@Param('id') id: string, @Req() req: any) {
    // TODO: Wire up to reportsService.remove(id, req.user.userId)
    throw new NotImplementedException(
      'DELETE /api/reports/:id not implemented',
    );
  }
}
