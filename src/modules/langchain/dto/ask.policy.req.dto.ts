import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { message } from 'src/common/message';

export class AskPolicyReqDTO {
  @ApiProperty({ description: 'input prompt of user' })
  @IsString({
    message: message.VALIDATION.IS_STRING('input'),
  })
  input: string;
}
