import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EventMode, EventType } from 'src/database/entities/event.entity';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startTime: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  endTime: Date;

  @IsEnum(EventMode)
  @IsNotEmpty()
  emode: EventMode;

  @IsEnum(EventType)
  @IsNotEmpty()
  etype: EventType;
}
