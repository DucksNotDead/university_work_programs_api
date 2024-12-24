import { IsString, IsInt, IsOptional } from '@nestjs/class-validator';

export class UpdateSpecialtyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  direction?: string;

  @IsOptional()
  @IsInt()
  faculty_id?: number;
}
