import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../../database/entities';
import { DatabaseModule } from '../../database/database.module';
import { DATA_SOURCE } from '../../common/constant';
import { DataSource } from 'typeorm';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      inject: [DATA_SOURCE],
      provide: "USER",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    },
  ],
  exports: [UserService],
})
export class UserModule {}
