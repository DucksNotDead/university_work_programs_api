import { IsEnum, IsInt } from '@nestjs/class-validator';
import { EStudyType } from '../../../shared/enums'; // Типы для studytype

export class CreateDisciplineInStudyPlanDto {
  @IsInt()
  study_plan_id: number;

  @IsInt()
  discipline_id: number;

  @IsInt()
  semester: number;

  @IsEnum(EStudyType)
  type: EStudyType;

  @IsInt()
  hours: number;
}