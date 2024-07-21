import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ClientAuthGuard } from '../../core/guards/auth.guard';
import { CurrentUser } from '../../core/decorators/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from '../../database/entities';
import { Public } from 'src/core/decorators/public.decorator';
import { departments, Tags } from 'src/common/constant';
import { message } from 'src/common/message';

@Controller('user')
@ApiBearerAuth()
@ApiTags(Tags.USER)
@UseGuards(ClientAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'get profile of user' })
  @Get('/profile')
  @HttpCode(HttpStatus.ACCEPTED)
  async register(@CurrentUser() user: User) {
    return {
      message: message.SUCCESS.USER_PROFILE,
      data: {
        user,
      },
    };
  }

  @Get('/departments')
  @Public()
  async getDepartments() {
    return {
      message: message.SUCCESS.DEPARTMENT,
      data: {
        departments,
      },
    };
  }
}
