import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from '@nestjs/class-validator';
import { EStudyType } from '../../../shared/enums';

export class UpdateProgramSubsectionDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  section_id?: number;

  @IsEnum(EStudyType)
  @IsOptional()
  type?: EStudyType;

  @IsInt()
  @Min(1)
  @IsOptional()
  volume?: number;

  @IsString()
  @IsOptional()
  label: string;
}
