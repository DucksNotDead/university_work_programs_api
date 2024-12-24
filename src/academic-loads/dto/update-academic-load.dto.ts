import { IsInt, IsOptional } from '@nestjs/class-validator';

export class UpdateAcademicLoadDto {
	@IsInt()
	@IsOptional()
	speciality_id?: number;

	@IsInt()
	@IsOptional()
	discipline_id?: number;

	@IsInt()
	@IsOptional()
	volume?: number;
}