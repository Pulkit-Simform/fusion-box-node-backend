import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { HOLIDAYS } from 'src/common/constant';
import { GetEventsDTO } from './dto/get-events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const event = await this.eventsService.create(createEventDto);
    return {
      message:"event created successfully!",
      data: {
        event
      }
    }
  }

  @Post('filter')
  async findAll(@Body() body: GetEventsDTO) {
    const events = await this.eventsService.findEventBetweenRange(body.startDate, body.endDate);
      return {
        message: "events",
        data:{
          events
        }
      };
  }

  @Get('holidays')
  getHolidays(){
    return {
      message: "holidays",
      data: {
        holidays: HOLIDAYS
      }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
