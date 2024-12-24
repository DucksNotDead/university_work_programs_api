import { IsString, IsInt, IsOptional } from '@nestjs/class-validator';

export class UpdateDepartmentDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsInt()
	faculty_id?: number;

	@IsOptional()
	@IsInt()
	head_id?: number;
}