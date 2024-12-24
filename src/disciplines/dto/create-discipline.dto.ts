import { IsInt, IsString } from '@nestjs/class-validator';

export class CreateDisciplineDto {
	@IsString()
	name: string;

	@IsInt()
	department_id: number;
}