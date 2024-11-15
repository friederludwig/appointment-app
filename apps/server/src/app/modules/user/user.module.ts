import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from '../db/database.module';
import { UserService } from './user.service';
import { userProviders } from './user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService, ...userProviders],
})
export class UserModule {}
