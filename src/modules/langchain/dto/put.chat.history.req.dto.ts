import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, ValidateNested } from 'class-validator';
import { message } from 'src/common/message';
import { ChatMessage } from 'src/core/interfaces/chatHistory';
import { QueryType } from 'src/database/entities/chat.history.entity';

export class PutChatHistoryReqDTO {
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

  @ApiProperty({ type: ChatMessage, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => ChatMessage)
  messages: ChatMessage[];
}
