import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { message } from 'src/common/message';
import { QueryType } from 'src/database/entities/chat.history.entity';

export class GetChatHistoryReqDTO {
  @ApiProperty({
    description: 'Provide the queryType for history',
    enum: QueryType,
  })
  @IsEnum(QueryType, {
    message: message.VALIDATION.IS_ENUM(
      'queryType',
      `${Object.values(QueryType).join(', ')}`,
    ),
  })
  queryType: QueryType;
}
