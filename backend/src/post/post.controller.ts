import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserRole } from '@prisma/__generated__';

import { Authorization } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/authorized.decorator';

import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll() {
    return this.postService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.postService.getById(id);
  }

  @Authorization(UserRole.ADMIN)
  @Post()
  async create(
    @Body() dto: CreatePostDto,
    @CurrentUser('id') authorId: string,
  ) {
    return this.postService.create(authorId, dto);
  }

  @Authorization(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
