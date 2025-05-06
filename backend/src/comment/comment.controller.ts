import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserRole } from '@prisma/__generated__';
import { Authorization } from 'src/auth/decorators/auth.decorator';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':postId')
  async getByPostId(@Param('postId') postId: string) {
    return this.commentService.getByPostId(postId);
  }

  @Post(':postId')
  async create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    return this.commentService.create(postId, dto);
  }

  @Authorization(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
