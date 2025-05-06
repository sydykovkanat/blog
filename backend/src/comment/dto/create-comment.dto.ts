import { MinLength } from 'class-validator';

export class CreateCommentDto {
  @MinLength(1, {
    message: 'Имя пользователя не может быть пустым',
  })
  username: string;

  @MinLength(1, {
    message: 'Комментарий не может быть пустым',
  })
  content: string;
}
