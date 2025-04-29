import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';

import { PrismaService } from '../prisma/prisma.service';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  public async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  public async create(
    email: string,
    password: string,
    displayName: string,
    isVerified: boolean,
    picture?: string,
  ) {
    return this.prismaService.user.create({
      data: {
        email,
        password: password ? await hash(password) : '',
        displayName,
        picture,
        isVerified,
      },
    });
  }

  public async update(userId: string, dto: UpdateUserDto) {
    const user = await this.findById(userId);

    return this.prismaService.user.update({
      where: { id: user.id },
      data: {
        email: dto.email,
        displayName: dto.displayName,
      },
    });
  }
}
