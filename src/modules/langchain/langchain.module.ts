import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { LangChainService } from './lang-chain.service';
import { LangChainController } from './lang-chain.controller';

@Module({
  controllers: [LangChainController],
  providers: [ConfigService, LangChainService],
  exports: [LangChainService],
})
export class LangChainModule {}
