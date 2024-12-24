import { IsInt, IsString } from '@nestjs/class-validator';

export class CreateProgramSectionDto {
	@IsInt()
	standard_id: number;

	@IsString()
	title: string;
}