import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_REPOSITORY } from '../../core/constants';
import { CreateCommentDto } from './dto/create.comment.dto';
import { Comment } from '../../core/models/comment/comment.model';

@Injectable()
export class CommentsService {
  constructor(@Inject(COMMENT_REPOSITORY) private readonly commentRepository: typeof Comment) {}

  create(dto: CreateCommentDto) {
    return this.commentRepository.create(dto);
  }
}
