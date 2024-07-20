import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { message } from 'src/common/message';
import { ResponseResult } from 'src/core/interceptors/response';
import { LangChainService } from './lang-chain.service';
import { AskPolicyReqDTO } from './dto';

@Controller('ask')
export class LangChainController {
  constructor(private readonly langChainService: LangChainService) {}

  @Get('policy')
  @ApiOperation({
    summary: 'This api is return searched data from stored vectors.',
  })
  @ApiOkResponse({ description: '`Ask Policies.`' })
  // @ApiBearerAuth()
  async getPolicyExplanation(@Query() query: AskPolicyReqDTO) {
    const data = await this.langChainService.getPolicyExplanation(query);

    return new ResponseResult({
      data,
      message: message.SUCCESS.OK,
      statusCode: HttpStatus.OK,
    });
  }
}
