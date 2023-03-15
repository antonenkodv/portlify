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
import { join } from 'path';
import * as fs from 'fs';
import * as archiver from 'archiver';

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
  destroy(@CurrentUser() user: User, @Param('id') imageId: string) {
    return this.imageService.destroy(imageId);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get('files')
  async getAllImageFiles(@Res() response: Response) {
    const directoryPath = join(process.cwd(), 'public');
    const filePaths = await fs.promises.readdir(directoryPath);

    const archive = archiver('zip', {
      zlib: { level: 9 },
    });
    archive.on('error', (err) => {
      throw err;
    });

    response.setHeader('Content-Type', 'application/zip');
    response.setHeader('Content-Disposition', `attachment; filename="images.zip"`);

    archive.pipe(response);

    for (let filePath of filePaths) {
      filePath = join(process.cwd(), 'public', filePath);
      const fileStream = fs.createReadStream(filePath);
      const fileName = filePath.split('/').pop();
      archive.append(fileStream, { name: fileName });
    }
    archive.finalize();
  }
}
