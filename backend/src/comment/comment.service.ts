import { Injectable, NotFoundException } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postService: PostService,
  ) {}

  async getById(id: string) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    return comment;
  }

  async getByPostId(postId: string) {
    const post = await this.postService.getById(postId);

    return this.prismaService.comment.findMany({
      where: {
        postId: post.id,
      },
    });
  }

  async create(postId: string, dto: CreateCommentDto) {
    const post = await this.postService.getById(postId);

    return this.prismaService.comment.create({
      data: {
        ...dto,
        postId: post.id,
      },
    });
  }

  async delete(id: string) {
    const comment = await this.getById(id);

    return this.prismaService.comment.delete({
      where: {
        id: comment.id,
      },
    });
  }
}
