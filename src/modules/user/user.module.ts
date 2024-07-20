import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Skill, User } from '../../database/entities';
import { DatabaseModule } from '../../database/database.module';
import { DATA_SOURCE } from '../../common/constant';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, ConfigModule, JwtModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      inject: [DATA_SOURCE],
      provide: 'USER',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    },
    {
      inject: [DATA_SOURCE],
      provide: 'SKILL',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Skill),
    },
  ],
  exports: [UserService],
})
export class UserModule {}
