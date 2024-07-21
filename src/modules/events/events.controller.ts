import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Tags } from 'src/common/constant';
import { GetEventsDTO } from './dto/get-events.dto';
import { ApiTags } from '@nestjs/swagger';
import { message } from 'src/common/message';

@ApiTags(Tags.EVENT)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Post()
  async create(@Body(ValidationPipe) createEventDto: CreateEventDto) {
    const event = await this.eventsService.create(createEventDto);
    return {
      message: message.EVENT.SUCCESS.CREATED,
      data: {
        event,
      },
    };
  }

  @Post('filter')
  async findAll(@Body(ValidationPipe) body: GetEventsDTO) {
    const events = await this.eventsService.findEventBetweenRange(
      body.startDate,
      body.endDate,
    );
    return {
      message: message.EVENT.SUCCESS.SINGLE_EVENT,
      data: {
        events,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(+id);
    return {
      message: message.EVENT.SUCCESS.SINGLE_EVENT,
      data: {
        event,
      },
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const event = await this.eventsService.update(+id, updateEventDto);
    return {
      message: message.EVENT.SUCCESS.UPDATED,
      data: {
        event,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const event = await this.eventsService.remove(+id);
    return {
      message: message.EVENT.SUCCESS.DELETED,
      data: {
        event,
      },
    };
  }
}
