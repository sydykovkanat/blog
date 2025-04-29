import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Имя должно быть строкой.' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения.' })
  displayName: string;

  @IsEmail({}, { message: 'Некорректный формат email.' })
  @IsOptional()
  email: string;
}
