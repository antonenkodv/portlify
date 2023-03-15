import { Controller, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../core/decorators/current.user.decorator';
import { User } from '../../core/models/user/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  destroy(@CurrentUser() user: User) {
    return this.usersService.destroy(user);
  }
}
