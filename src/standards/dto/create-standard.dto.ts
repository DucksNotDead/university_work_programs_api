import { IsInt } from '@nestjs/class-validator';

export class CreateStandardDto {
	@IsInt()
	discipline_id: number;
}