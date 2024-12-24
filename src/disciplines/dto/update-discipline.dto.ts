import { IsInt, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateDisciplineDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsInt()
	department_id?: number;
}