import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(id: string) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    return post;
  }

  async create(authorId: string, dto: CreatePostDto) {
    return this.prismaService.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        authorId,
      },
    });
  }

  async delete(id: string) {
    const post = await this.getById(id);

    return this.prismaService.post.delete({
      where: {
        id: post.id,
      },
    });
  }
}
