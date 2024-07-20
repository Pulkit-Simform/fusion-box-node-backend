import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DATA_SOURCE } from 'src/common/constant';
import { DataSource } from 'typeorm';
import { Project } from 'src/database/entities';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      inject: [DATA_SOURCE],
      provide: 'PROJECT',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Project),
    },
  ],
  imports: [DatabaseModule,UserModule]
})
export class ProjectModule {}
