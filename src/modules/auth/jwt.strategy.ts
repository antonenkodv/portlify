import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CONFIG } from '../../core/config/config';
import { Status } from '../../core/models/user/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONFIG.JWT.SECRET,
    });
  }

  async validate(payload: any) {
    const expirationTime = payload.exp;

    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > expirationTime) {
      throw new UnauthorizedException('Token has expired');
    }

    const user = await this.userService.findOneById(payload.id);
    if (!user || user.status !== Status.ONLINE) {
      throw new UnauthorizedException('You are not authorized to perform the operation');
    }
    return user;
  }
}
