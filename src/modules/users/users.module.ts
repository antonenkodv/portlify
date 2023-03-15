import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersProviders } from '../../core/models/user/user.provider';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...UsersProviders],
  exports: [UsersService],
})
export class UsersModule {}
