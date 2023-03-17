import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../core/decorators/current.user.decorator';
import { User } from '../../core/models/user/user.model';
import { CreateImageDto } from './dto/create.image.dto';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InputFile } from '../../core/models/image/image.model';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  create(
    @CurrentUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    image: InputFile,
    @Body() createImageDto: CreateImageDto,
  ) {
    return this.imageService.create(user, image, createImageDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async destroy(@CurrentUser() user: User, @Param('id') imageId: string) {
    const result = await this.imageService.destroy(user, imageId);
    return !!result;
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get('files')
  async getAllImageFiles(@Res() response: Response) {
    const result = await this.imageService.getAllImageFiles();

    response.setHeader('Content-Type', 'application/zip');
    response.setHeader('Content-Disposition', `attachment; filename="images.zip"`);

    result.pipe(response);
    result.finalize();
  }
}
