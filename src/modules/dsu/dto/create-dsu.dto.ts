import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDsuDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
  })
  project: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
  })
  postDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  blockers: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  todayUpdate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  tomorrowWork: string;
}
