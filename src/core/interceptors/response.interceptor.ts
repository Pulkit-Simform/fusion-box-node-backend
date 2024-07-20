import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { firstValueFrom, of } from 'rxjs';
import { statusMessages } from '../../common/constant';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  public constructor(private readonly reflector: Reflector) {}

  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const body = await firstValueFrom(next.handle());
    if (request.url === '/healthCheck') return of(body);
    const status =
      this.reflector.get<number>('__httpCode__', context.getHandler()) || 200;

    return of({
      statusCode: body?.statusCode || status,
      message: body?.message || statusMessages[status],
      data: body?.data || null,
      error: null,
    });
  }
}
