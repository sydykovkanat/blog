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
import { User } from '@prisma/__generated__';
import { fileTypeFromBuffer } from 'file-type';
import * as heicConvert from 'heic-convert';
import { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';

import { Authorization } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/authorized.decorator';
import * as fs from 'fs/promises';

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

  @Authorization()
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/posts',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname).toLowerCase();
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (_req, file, callback) => {
        const isValid = file.mimetype.startsWith('image/');
        if (!isValid) {
          return callback(
            new BadRequestException(
              'Невалидный тип файла. Разрешены только изображения.',
            ),
            false,
          );
        }
        callback(null, true);
      },

      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  async create(
    @Body() dto: CreatePostDto,
    @CurrentUser('id') authorId: string,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const convertedImages: Express.Multer.File[] = [];
    if (!images || images.length === 0) {
      return this.postService.create(authorId, dto);
    }

    for (const image of images) {
      const inputBuffer = await fs.readFile(image.path);
      const fileType = await fileTypeFromBuffer(inputBuffer);

      if (fileType?.mime === 'image/heic' || fileType?.mime === 'image/heif') {
        const outputBuffer = await heicConvert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 1,
        });

        const newFilename = image.filename.replace(/\.(heic|heif)$/i, '.jpg');
        const newPath = path.join(path.dirname(image.path), newFilename);
        await fs.writeFile(newPath, Buffer.from(outputBuffer));
        await fs.unlink(image.path);

        convertedImages.push({
          ...image,
          path: newPath,
          filename: newFilename,
          originalname: image.originalname.replace(/\.(heic|heif)$/i, '.jpg'),
          mimetype: 'image/jpeg',
        });
      } else {
        convertedImages.push(image);
      }
    }

    return this.postService.create(authorId, dto, convertedImages);
  }

  @Authorization()
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postService.delete(id, user);
  }
}
