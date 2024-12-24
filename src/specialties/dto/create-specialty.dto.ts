import { IsString, IsInt } from '@nestjs/class-validator';

export class CreateSpecialtyDto {
	@IsString()
	name: string;

	@IsString()
	direction: string;

	@IsInt()
	faculty_id: number;
}