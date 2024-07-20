import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class GetEventsDTO {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'date of start',
  })
  startDate: Date;

  @IsDate()
  @ApiProperty({
    type: Date,
    description: 'date of end',
  })
  @IsNotEmpty()
  endDate: Date;
}
