import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { CurrentUser } from '../../core/decorators/current.user.decorator';
import { User } from '../../core/models/user/user.model';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  signUp(@Body() user: UserDto) {
    return this.authService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logOut(@CurrentUser() user: User) {
    return this.authService.logOut(user);
  }
}
