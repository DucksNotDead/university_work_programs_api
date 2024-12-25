import { IsEnum, IsInt, Min, IsString } from '@nestjs/class-validator';
import { EStudyType } from '../../../shared/enums';

export class CreateProgramSubsectionDto {
  @IsInt()
  @Min(1)
  section_id: number;

  @IsEnum(EStudyType)
  type: EStudyType;

  @IsInt()
  @Min(1)
  volume: number;

  @IsString()
  label: string
}
