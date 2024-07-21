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
import {
  AskPolicyReqDTO,
  GetChatHistoryReqDTO,
  PutChatHistoryReqDTO,
} from './dto';
import { ClientAuthGuard } from 'src/core/guards/auth.guard';
import { CurrentUser } from 'src/core/decorators/user.decorator';
import { User } from 'src/database/entities';
import { Tags } from 'src/common/constant';

@ApiBearerAuth()
@ApiTags(Tags.CHAT)
@UseGuards(ClientAuthGuard)
@Controller('chat')
export class LangChainController {
  constructor(private readonly langChainService: LangChainService) {}

  @Get()
  @ApiOperation({
    summary: 'This api is return searched data from stored vectors.',
  })
  @ApiOkResponse({ description: '`Ok`' })
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
    summary: 'This api is returns chat history of user.',
  })
  @ApiOkResponse({ description: '`Retrieved.`' })
  @ApiBearerAuth()
  async getChatHistory(
    @CurrentUser() user: User,
    @Query() query: GetChatHistoryReqDTO,
  ) {
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
    summary: 'This api is updates the chat history.',
  })
  @ApiOkResponse({ description: '`Updated.`' })
  async updateChatHistory(
    @CurrentUser() user: User,
    @Body() query: PutChatHistoryReqDTO,
  ) {
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
