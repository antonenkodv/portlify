import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CONFIG } from '../../core/config/config';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: CONFIG.JWT.SECRET,
      signOptions: { expiresIn: CONFIG.JWT.EXPIRES_IN },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
