import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
  imports:[ConfigModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
