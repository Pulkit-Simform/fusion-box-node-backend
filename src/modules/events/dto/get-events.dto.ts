import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class GetEventsDTO {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'date of start',
  })
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    description: 'date of end',
  })
  @IsNotEmpty()
  endDate: Date;
}
