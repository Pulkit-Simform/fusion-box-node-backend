import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { message } from 'src/common/message';
import { ResponseResult } from 'src/core/interceptors/response';
import { LangChainService } from './lang-chain.service';
import { AskPolicyReqDTO } from './dto';
import { ClientAuthGuard } from 'src/core/guards/auth.guard';
import { CurrentUser } from 'src/core/decorators/user.decorator';
import { User } from 'src/database/entities';

@UseGuards(ClientAuthGuard)
@ApiTags('chat')
@Controller('chat')
export class LangChainController {
  constructor(private readonly langChainService: LangChainService) {}

  @Get()
  @ApiOperation({
    summary: 'This api is return searched data from stored vectors.',
  })
  @ApiOkResponse({ description: '`Ask Policies.`' })
  @ApiBearerAuth()
  async chat(@CurrentUser() user: User, @Query() query: AskPolicyReqDTO) {
    const data = await this.langChainService.chat(query.input, user);

    return new ResponseResult({
      data,
      message: message.SUCCESS.OK,
      statusCode: HttpStatus.OK,
    });
  }

  @Get('history')
  @ApiOperation({
    summary: 'This api is return searched data from stored vectors.',
  })
  @ApiOkResponse({ description: '`Ask Policies.`' })
  @ApiBearerAuth()
  async getChatHistory(@CurrentUser() user: User, @Query() query: any) {
    const data = await this.langChainService.getChatHistory(
      user.id,
      query.queryType,
    );

    return new ResponseResult({
      data,
      message: message.SUCCESS.OK,
      statusCode: HttpStatus.ACCEPTED,
    });
  }

  @Put('history')
  @ApiOperation({
    summary: 'This api is return searched data from stored vectors.',
  })
  @ApiOkResponse({ description: '`Ask Policies.`' })
  @ApiBearerAuth()
  async updateChatHistory(@CurrentUser() user: User, @Body() query: any) {
    const data = await this.langChainService.updateChatHistory(
      user.id,
      query.queryType,
      query.messages,
    );

    return new ResponseResult({
      data,
      message: message.SUCCESS.OK,
      statusCode: HttpStatus.ACCEPTED,
    });
  }
}
