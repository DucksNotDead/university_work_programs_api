import { IsEnum, IsInt, IsOptional } from '@nestjs/class-validator';
import { EStudyType } from '../../../shared/enums'; // Типы для studytype

export class UpdateDisciplineInStudyPlanDto {
  @IsOptional()
  @IsInt()
  study_plan_id?: number;

  @IsOptional()
  @IsInt()
  discipline_id?: number;

  @IsOptional()
  @IsInt()
  semester?: number;

  @IsOptional()
  @IsEnum(EStudyType)
  type?: EStudyType;

  @IsOptional()
  @IsInt()
  hours?: number;
}