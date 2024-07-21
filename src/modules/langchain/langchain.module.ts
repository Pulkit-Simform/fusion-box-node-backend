import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { LangChainService } from './lang-chain.service';
import { LangChainController } from './lang-chain.controller';
import { DATA_SOURCE } from 'src/common/constant';
import { ChatHistory } from 'src/database/entities/chat.history.entity';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, ConfigModule, JwtModule, UserModule],
  controllers: [LangChainController],
  providers: [
    ConfigService,
    LangChainService,
    {
      inject: [DATA_SOURCE],
      provide: 'CHAT_HISTORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ChatHistory),
    },
  ],
  exports: [LangChainService],
})
export class LangChainModule {}
