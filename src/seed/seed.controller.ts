import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Demo Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @ApiOperation({
    summary:
      'Reset / refresh demo protest data and set verifiedAt = now so heatmap points are fresh for the demo',
  })
  reseed() {
    return this.seedService.runSeed(true);
  }
}
