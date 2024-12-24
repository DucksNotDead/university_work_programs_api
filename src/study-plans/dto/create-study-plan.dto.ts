import { IsInt, IsString, IsOptional } from '@nestjs/class-validator';

export class CreateStudyPlanDto {
	@IsInt()
	speciality_id: number;

	@IsInt()
	year: number;

	@IsOptional()
	@IsString()
	description?: string;
}