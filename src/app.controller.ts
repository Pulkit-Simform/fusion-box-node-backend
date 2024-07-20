import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';
import { Tags, apiVersion } from './common/constant';
import { Public } from './core/decorators/public.decorator';
import { ClientAuthGuard } from './core/guards/auth.guard';
import { CurrentUser } from './core/decorators/user.decorator';

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