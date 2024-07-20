import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LangChainModule } from './modules/langchain/langchain.module';

@Module({
  imports: [DatabaseModule, LangChainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
