import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../core/decorators/current.user.decorator';
import { User } from '../../core/models/user/user.model';
import { CreateCommentDto } from './dto/create.comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@CurrentUser() user: User, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }
}
