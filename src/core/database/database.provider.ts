import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ISequelizeConfig } from './interface/database.config.interface';
import { Dialect } from 'sequelize/types/sequelize';
import { User } from '../models/user/user.model';
import { Portfolio } from '../models/portfolio/portfolio.model';
import { Image } from '../models/image/image.model';
import { Comment } from '../models/comment/comment.model';

export const DatabaseProvider = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<ISequelizeConfig> => ({
    dialect: configService.get<string>('DB_DIALECT') as Dialect,
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    models: [User, Portfolio, Image, Comment],
    synchronize: true,
    // autoLoadModels:true,
  }),
  inject: [ConfigService],
});
