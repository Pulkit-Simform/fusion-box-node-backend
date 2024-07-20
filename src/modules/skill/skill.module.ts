import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { Skill } from 'src/database/entities';
import { DATA_SOURCE } from 'src/common/constant';
import { DataSource } from 'typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [SkillController],
  providers: [
    SkillService,
    {
      inject: [DATA_SOURCE],
      provide: 'SKILL',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Skill),
    },
  ],
  imports: [DatabaseModule, UserModule, ConfigModule, JwtModule],
})
export class SkillModule {}
