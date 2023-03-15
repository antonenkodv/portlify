import {
    Body,
    Controller, FileTypeValidator,
    Get, MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {CurrentUser} from "../../core/decorators/current.user.decorator";
import {User} from "../../core/models/user/user.model";
import {CreateImageDto} from "./dto/create.image.dto";
import {ImagesService} from "./images.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {InputFile} from "../../core/models/image/image.model";

@Controller('images')
export class ImagesController {
    constructor(private imageService: ImagesService) {

    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('image'))
    create(@CurrentUser() user: User,
           @UploadedFile(new ParseFilePipe({
               validators: [
                   new FileTypeValidator({fileType: 'image/jpeg'}),
               ],
           })) image: InputFile,
           @Body() createImageDto: CreateImageDto) {

        return this.imageService.create(user, image, createImageDto)
    }

}
