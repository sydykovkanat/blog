import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserRole } from '@prisma/__generated__';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/posts',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (_req, file, callback) => {
        const isImage = file.mimetype.startsWith('image/');
        if (!isImage) {
          return callback(
            new BadRequestException('Невалидный тип файла'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body() dto: CreatePostDto,
    @CurrentUser('id') authorId: string,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.postService.create(authorId, dto, images);
  }

  @Authorization(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
