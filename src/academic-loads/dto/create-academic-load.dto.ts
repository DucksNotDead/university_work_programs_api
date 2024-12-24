import { IsInt, IsNotEmpty, IsOptional } from '@nestjs/class-validator';

export class CreateAcademicLoadDto {
	@IsInt()
	@IsNotEmpty()
	speciality_id: number;

	@IsInt()
	@IsNotEmpty()
	discipline_id: number;

	@IsInt()
	@IsNotEmpty()
	volume: number;
}