import { IsInt, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateProgramDto {
	@IsInt()
	standard_id: number;

	@IsString()
	questions: string;

	@IsOptional()
	@IsString()
	skills?: string;

	@IsOptional()
	@IsString()
	literature?: string;
}