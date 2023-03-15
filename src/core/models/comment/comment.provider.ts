import { COMMENT_REPOSITORY } from '../../constants';
import { Comment } from './comment.model';

export const CommentProviders = [
  {
    provide: COMMENT_REPOSITORY,
    useValue: Comment,
  },
];
