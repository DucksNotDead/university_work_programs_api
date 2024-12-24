import { IsInt, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateProgramDto {
	@IsOptional()
	@IsInt()
	standard_id?: number;

	@IsOptional()
	@IsString()
	questions?: string;

	@IsOptional()
	@IsString()
	skills?: string;

	@IsOptional()
	@IsString()
	literature?: string;
}