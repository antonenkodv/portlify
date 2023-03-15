import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImageProviders } from '../../core/models/image/image.provider';
import { PortfolioProviders } from '../../core/models/portfolio/portfolio.provider';

@Module({
  providers: [ImagesService, ...ImageProviders, ...PortfolioProviders],
  controllers: [ImagesController],
})
export class ImagesModule {}
