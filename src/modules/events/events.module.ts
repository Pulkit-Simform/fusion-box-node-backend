import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DATA_SOURCE } from 'src/common/constant';
import { DataSource } from 'typeorm';
import { Event } from 'src/database/entities/event.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    {
      inject: [DATA_SOURCE],
      provide: 'EVENT',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
    },
  ],
  imports: [DatabaseModule],
})
export class EventsModule {}
