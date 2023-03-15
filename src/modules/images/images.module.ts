import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import {ImageProviders} from "../../core/models/image/image.provider";

@Module({
  providers: [ImagesService,...ImageProviders],
  controllers: [ImagesController]
})
export class ImagesModule {}
