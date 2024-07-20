import { DatabaseService } from './database.service';
import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import dataSource from './dataSource';
import { DATA_SOURCE } from 'src/common/constant';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: () => dataSource.initialize(),
  },
  DatabaseService,
  ConfigService,
];

@Module({
  exports: databaseProviders,
  providers: databaseProviders,
})
export class DatabaseModule {}
