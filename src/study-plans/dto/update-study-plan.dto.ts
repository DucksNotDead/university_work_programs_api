import { IsInt, IsString, IsOptional } from '@nestjs/class-validator';

export class UpdateStudyPlanDto {
	@IsOptional()
	@IsInt()
	speciality_id?: number;

	@IsOptional()
	@IsInt()
	year?: number;

	@IsOptional()
	@IsString()
	description?: string;
}