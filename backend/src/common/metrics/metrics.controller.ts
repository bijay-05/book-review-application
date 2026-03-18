import { Controller, Get, Res } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Response } from 'express';
import { register } from 'prom-client';

@Controller('metrics')
export class MetricsController {
  constructor(
    private metricsService: MetricsService,
  ) {}

  @Get()
  async getMetrics(@Res() res: Response): Promise<any> {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  }
}