import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {UsersProviders} from "../../core/models/user/user.provider";

@Module({
  providers: [UsersService, ...UsersProviders],
  exports: [UsersService],
})
export class UsersModule {}
