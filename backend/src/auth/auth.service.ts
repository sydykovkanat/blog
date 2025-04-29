import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/__generated__';
import { verify } from 'argon2';
import { Request, Response } from 'express';

import { UserService } from '../user/user.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => EmailConfirmationService))
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  public async register(dto: RegisterDto) {
    const isExists = await this.userService.findByEmail(dto.email);

    if (isExists) {
      throw new ConflictException(
        'Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему.',
      );
    }

    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.displayName,
      false,
    );

    await this.emailConfirmationService.sendVerificationToken(newUser);

    return {
      message:
        'Вы успешно зарегистрированы. Пожалуйста, подтвердите свой email. Ссылка для подтверждения была отправлена на ваш email.',
    };
  }

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user || !user.password) {
      throw new NotFoundException(
        'Пользователь с таким email не найден. Пожалуйста, проверьте правильность введенных данных.',
      );
    }

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(
        'Неверный пароль. Пожалуйста, проверьте правильность введенных данных.',
      );
    }

    if (!user.isVerified) {
      await this.emailConfirmationService.sendVerificationToken(user);

      throw new UnauthorizedException(
        'Пользователь не подтвержден. Пожалуйста, подтвердите свой email. Ссылка для подтверждения была отправлена на ваш email.',
      );
    }

    return this.saveSession(req, user);
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException(
              'Не удалось завершить сессию пользователя. Пожалуйста, попробуйте еще раз.',
            ),
          );
        }

        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));

        resolve();
      });
    });
  }

  public async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;

      req.session.save((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException(
              'Не удалось сохранить сессию пользователя. Пожалуйста, попробуйте еще раз.',
            ),
          );
        }

        resolve({
          user,
        });
      });
    });
  }
}
