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
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @IsEnum(EventMode)
  @IsNotEmpty()
  emode: EventMode;

  @IsEnum(EventType)
  @IsNotEmpty()
  etype: EventType;
}
