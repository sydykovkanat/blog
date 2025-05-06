import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/__generated__';

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
      include: {
        comments: true,
      },
    });
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    return post;
  }

  async create(
    authorId: string,
    dto: CreatePostDto,
    images?: Express.Multer.File[],
  ) {
    const imageUrls =
      (images &&
        images.length > 0 &&
        images.map((image) => {
          const filename = image.filename;
          return `/uploads/posts/${filename}`;
        })) ||
      [];

    return this.prismaService.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        authorId,
        images: imageUrls,
      },
    });
  }

  async delete(id: string, user: User) {
    const post = await this.getById(id);

    if (user.role !== UserRole.ADMIN && user.id !== post.authorId) {
      console.log(user.role, user.id, post.authorId);
      throw new ForbiddenException('У вас нет прав для удаления этого поста');
    }

    return this.prismaService.post.delete({
      where: {
        id: post.id,
      },
    });
  }
}
