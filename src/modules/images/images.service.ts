import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMAGE_REPOSITORY, PORTFOLIO_REPOSITORY } from '../../core/constants';
import { Image, InputFile } from '../../core/models/image/image.model';
import { User } from '../../core/models/user/user.model';
import { CreateImageDto } from './dto/create.image.dto';
import { createWriteStream } from 'fs';
import { Portfolio } from '../../core/models/portfolio/portfolio.model';
import { Comment } from '../../core/models/comment/comment.model';
import { extname } from 'path';
import { randomUUID } from 'crypto';
@Injectable()
export class ImagesService {
  constructor(
    @Inject(IMAGE_REPOSITORY) private readonly imageRepository: typeof Image,
    @Inject(PORTFOLIO_REPOSITORY) private readonly portolioRepository: typeof Portfolio,
  ) {}

  async create(user: User, imageFile: InputFile, dto: CreateImageDto) {
    const portfolio = await this.portolioRepository.findOne({ where: { id: dto.portfolioId } });
    if (!portfolio) throw new NotFoundException('Portfolio not found');

    const ext = extname(imageFile.originalname);
    const path = `${process.cwd()}/public/${imageFile.originalname}`;

    const stream = createWriteStream(path);
    stream.write(imageFile.buffer);
    stream.end();

    return this.imageRepository.create({
      name: imageFile.originalname,
      description: dto.description,
      portfolioId: dto.portfolioId,
    });
  }

  destroy(imageId: string) {
    return this.imageRepository.destroy({ where: { id: imageId } });
  }

  findAll() {
    return this.imageRepository.findAll({
      attributes: [['name', 'imageName'], 'description', 'createdAt'],
      include: [
        {
          model: Portfolio,
          attributes: ['name'],
          required: false,
        },
        {
          model: Comment,
          attributes: ['text'],
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }
}
