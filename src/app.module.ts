import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { UsersModule } from './modules/users/users.module';
import { env } from "process"
import {DatabaseProvider} from "./core/database/database.provider";
import { AuthModule } from './modules/auth/auth.module';
import { PortfoliosModule } from './modules/portfolios/portfolios.module';
import { ImagesModule } from './modules/images/images.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from "path"
const stage = env.NODE_ENV

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.env.${stage}`,
          isGlobal: true
      }),
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public'),
      }),
      DatabaseProvider,
      UsersModule,
      AuthModule,
      PortfoliosModule,
      ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(){

    }
}
