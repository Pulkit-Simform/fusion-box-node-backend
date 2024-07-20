import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SkillModule } from './modules/skill/skill.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, SkillModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
