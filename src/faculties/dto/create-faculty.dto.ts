import { IsString, IsNotEmpty } from '@nestjs/class-validator';

export class CreateFacultyDto {
	@IsString()
	@IsNotEmpty()
	name: string;
}