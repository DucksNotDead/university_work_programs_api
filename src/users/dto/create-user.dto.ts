import { IsString, IsNotEmpty, IsEnum } from '@nestjs/class-validator';
import { ERole } from '../../../shared/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fio: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(ERole)
  role: ERole;
}
