import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from 'src/database/entities/event.entity';
import { message } from 'src/common/message';

@Injectable()
export class EventsService {
  constructor(@Inject('EVENT') private eventRepo: Repository<Event>) {}
  async create(createEventDto: CreateEventDto) {
    const event = this.eventRepo.create(createEventDto);
    return this.eventRepo.save(event);
  }

  async findEventBetweenRange(startDate: Date, endDate: Date) {
    const events = await this.eventRepo.find({
      where: {
        startDate: MoreThanOrEqual(startDate),
        endDate: LessThanOrEqual(endDate),
      },
    });
    return events;
  }

  async findOne(id: number) {
    return this.eventRepo.findOneBy({
      id,
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);
    if (!event) {
      throw new NotFoundException(message.EVENT.ERROR.NOT_FOUND);
    }
    Object.assign(event, { ...updateEventDto });
    return this.eventRepo.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    if (!event) {
      throw new NotFoundException(message.EVENT.ERROR.NOT_FOUND);
    }
    return this.eventRepo.remove(event);
  }
}
