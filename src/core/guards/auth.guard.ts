import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { IS_PUBLIC } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../modules/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ClientAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Exclude requests that do not require authorization
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Extract the token from the cookies
    const token = request.cookies['jwt'];

    if (!token) {
      throw new HttpException('Authorization token is missing', 401);
    }

    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      const user = await this.userService.getUsersById(decodedToken.id);

      if (!user) {
        throw new UnauthorizedException('You are not logged in');
      }

      request.user = user;
      return true;
    } catch (e) {
      if (this.configService.get('NODE_ENV') === 'development') {
        throw new BadRequestException(e.message);
      }
      return false;
    }
  }
}
