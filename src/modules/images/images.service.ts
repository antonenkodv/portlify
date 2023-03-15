import {Inject, Injectable,} from '@nestjs/common';
import {IMAGE_REPOSITORY} from "../../core/constants";
import {Image, InputFile} from "../../core/models/image/image.model"
import {User} from "../../core/models/user/user.model";
import {CreateImageDto} from "./dto/create.image.dto";
import {createWriteStream, existsSync, promises as fs} from "fs";

@Injectable()
export class ImagesService {
    constructor(@Inject(IMAGE_REPOSITORY) private readonly imageRepository: typeof Image) {
    }

    create(user: User,imageFile: InputFile, dto: CreateImageDto){
        const path = `${process.cwd()}/public/${imageFile.originalname}`;
        if (existsSync(path)) {
            return fs.readFile(path);
        }
        createWriteStream(path).write(imageFile.buffer);

        return this.imageRepository.create({
            name : imageFile.originalname,
            description : dto.description,
            portfolioId: dto.portfolio_id
        })
    }
}
