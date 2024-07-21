import {
  Controller,
  Body,
  Post,
  Res,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, ResponseUserDto } from '../user/dto';
import { LoginUserDto } from './dto';
import { ResponseCookieToken } from './dto/responseCookie.dto';
import { Response } from 'express';
import { Public } from '../../core/decorators/public.decorator';
import { message } from 'src/common/message';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private async commonResponseSender(
    data: ResponseUserDto,
    res: Response,
  ): Promise<ResponseCookieToken> {
    res.cookie('jwt', data.token);
    return { data: { access_token: data.token } };
  }

  @ApiOperation({ summary: 'Register user' })
  @Post('/register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body(ValidationPipe) user: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    user.email = user.email.toLowerCase();
    const createdUser: ResponseUserDto = await this.authService.register(user);
    res.cookie('jwt', createdUser.token);

    return {
      message: message.SUCCESS.REGISTER,
      data: { access_token: createdUser.token },
    };
  }

  @ApiOperation({ summary: 'Login user' })
  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.ACCEPTED)
  async login(
    @Body(ValidationPipe) user: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    user.email = user.email.toLowerCase();
    const validateUser: ResponseUserDto = await this.authService.login(user);
    res.cookie('jwt', validateUser.token);
    return {
      message: message.SUCCESS.AUTH.LOGIN,
      data: { access_token: validateUser.token },
    };
  }
}
