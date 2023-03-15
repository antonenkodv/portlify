import { Inject, Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create.portfolio.dto';
import { User } from '../../core/models/user/user.model';
import { PORTFOLIO_REPOSITORY } from '../../core/constants';
import { Portfolio } from '../../core/models/portfolio/portfolio.model';
import { Image } from '../../core/models/image/image.model';
import { Comment } from '../../core/models/comment/comment.model';

@Injectable()
export class PortfoliosService {
  constructor(@Inject(PORTFOLIO_REPOSITORY) private readonly portfolioRepository: typeof Portfolio) {}

  async create(user: Pick<User, 'id'>, dto: CreatePortfolioDto) {
    return this.portfolioRepository.create({ userId: user.id, ...dto });
  }
  async findAll(user: Pick<User, 'id'>) {
    return this.portfolioRepository.findAll({
      where: { userId: user.id },
      attributes: ['name', 'description', 'createdAt'],
      include: [
        {
          model: Image,
          attributes: [['name', 'imageName']],
          required: false,
          include: [
            {
              model: Comment,
              attributes: ['text'],
              required: false,
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }
  async findOne(user: Pick<User, 'id'>, portfolioId: number) {
    return this.portfolioRepository.findOne({ where: { userId: user.id, id: portfolioId } });
  }
  async destroy(user: Pick<User, 'id'>, portfolioId: number) {
    return this.portfolioRepository.destroy({ where: { userId: user.id, id: portfolioId } });
  }
}
