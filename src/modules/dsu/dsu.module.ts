import { Module } from '@nestjs/common';
import { DsuService } from './dsu.service';
import { DsuController } from './dsu.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { DATA_SOURCE } from 'src/common/constant';
import { DataSource } from 'typeorm';
import { DSU } from 'src/database/entities/dsu.entity';
import { ProjectModule } from '../project/project.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [DsuController],
  providers: [
    DsuService,
    {
      inject: [DATA_SOURCE],
      provide: 'DSU',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(DSU),
    },
  ],
  imports: [DatabaseModule, UserModule, JwtModule, ConfigModule, ProjectModule],
})
export class DsuModule {}
