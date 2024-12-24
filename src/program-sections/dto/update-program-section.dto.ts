import { IsInt, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateProgramSectionDto {
	@IsOptional()
	@IsInt()
	standard_id?: number;

	@IsOptional()
	@IsString()
	title?: string;
}