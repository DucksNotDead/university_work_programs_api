import { IsString, IsInt, IsOptional } from '@nestjs/class-validator';

export class CreateDepartmentDto {
	@IsString()
	name: string;

	@IsInt()
	faculty_id: number;

	@IsOptional()
	@IsInt()
	head_id?: number;
}