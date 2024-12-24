import { IsInt, IsOptional } from '@nestjs/class-validator';

export class UpdateStandardDto {
  @IsOptional()
  @IsInt()
  discipline_id?: number;
}
