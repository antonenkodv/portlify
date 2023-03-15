import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentProviders } from '../../core/models/comment/comment.provider';

@Module({
  providers: [CommentsService, ...CommentProviders],
  controllers: [CommentsController],
})
export class CommentsModule {}
