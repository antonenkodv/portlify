import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../core/constants';
import { User } from '../../core/models/user/user.model';
import { UserDto } from './dto/user.dto';
import { Col, Fn, Literal } from 'sequelize/types/utils';
import { Attributes } from 'sequelize/types/model';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) {}

  create(user: UserDto): Promise<User> {
    return this.userRepository.create<User>(user);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne<User>({ where: { email } });
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOne<User>({ where: { id } });
  }

  updateById(
    user: Pick<User, 'id'>,
    data: {
      [key in keyof Attributes<User>]?: Attributes<User>[key] | Fn | Col | Literal;
    },
  ) {
    return this.userRepository.update<User>(data, { where: { id: user.id }, returning: true });
  }

  destroy(user: Pick<User, 'id'>) {
    return this.userRepository.destroy({ where: { id: user.id } });
  }
}
