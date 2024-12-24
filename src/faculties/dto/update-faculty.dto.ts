import { IsString, IsOptional } from '@nestjs/class-validator';

export class UpdateFacultyDto {
	@IsString()
	@IsOptional()
	name?: string;
}