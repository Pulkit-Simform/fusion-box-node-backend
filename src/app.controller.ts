import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';
import { Tags, apiVersion } from './common/constant';
import { Public } from './core/decorators/public.decorator';

@ApiTags(Tags.HEALTH)
@Controller({ version: apiVersion, path: 'healthCheck' })
export class AppController {
  constructor() {}

  @Get()
  @HealthCheck()
  @Public()
  healthCheck() {
    return 'success';
  }
}