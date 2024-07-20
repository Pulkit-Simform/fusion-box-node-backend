import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum EventMode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum EventType {
  HOLIDAY = 'HOLIDAY',
  FLOATER = 'FLOATER',
  EVENT = 'EVENT',
}

@Entity('event')
export class Event extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'date',
  })
  startDate: Date;

  @Column({
    type: 'date',
  })
  endDate: Date;

  @Column({
    type: 'timestamp',
  })
  startTime: Date;

  @Column({
    type: 'timestamp',
  })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: EventMode,
    default: EventMode.OFFLINE,
  })
  emode: EventMode;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.EVENT,
  })
  etype: EventType;
}
