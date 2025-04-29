import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({
    message: 'Заголовок должен не может быть пустым',
  })
  title: string;

  @IsString({
    message: 'Контент должен не может быть пустым',
  })
  content: string;
}
