import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMAGE_REPOSITORY, PORTFOLIO_REPOSITORY } from '../../core/constants';
import { Image, InputFile } from '../../core/models/image/image.model';
import { User } from '../../core/models/user/user.model';
import { CreateImageDto } from './dto/create.image.dto';
import { Portfolio } from '../../core/models/portfolio/portfolio.model';
import { Comment } from '../../core/models/comment/comment.model';
import { extname, join } from 'path';
import * as fs from 'fs';
import * as archiver from 'archiver';

@Injectable()
export class ImagesService {
  constructor(
    @Inject(IMAGE_REPOSITORY) private readonly imageRepository: typeof Image,
    @Inject(PORTFOLIO_REPOSITORY) private readonly portolioRepository: typeof Portfolio,
  ) {}

  async create(user: Pick<User, 'id'>, imageFile: InputFile, dto: CreateImageDto) {
    const portfolio = await this.portolioRepository.findOne({ where: { id: dto.portfolioId } });
    if (!portfolio) throw new NotFoundException('Portfolio not found');

    const ext = extname(imageFile.originalname);
    const path = `${process.cwd()}/public/${imageFile.originalname}`;

    // TODO: save images in cloud object storage
    const stream = fs.createWriteStream(path);
    stream.write(imageFile.buffer);
    stream.end();

    return this.imageRepository.create({
      name: imageFile.originalname,
      description: dto.description,
      userId: user.id,
      portfolioId: dto.portfolioId,
    });
  }

  destroy(user: Pick<User, 'id'>, imageId: string) {
    return this.imageRepository.destroy({ where: { id: imageId, userId: user.id } });
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

  async getAllImageFiles() {
    const directoryPath = join(process.cwd(), 'public');
    const filePaths = await fs.promises.readdir(directoryPath);

    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', (err) => {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    for (let filePath of filePaths) {
      filePath = join(process.cwd(), 'public', filePath);
      const fileStream = fs.createReadStream(filePath);
      const fileName = filePath.split('/').pop();
      archive.append(fileStream, { name: fileName });
    }

    return archive;
  }
}
