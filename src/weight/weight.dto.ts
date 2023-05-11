import {
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateWeightDTO {
	@IsNumber()
	public readonly value: number;

	@IsString()
	public readonly date: string;
}

export class UpdateWeightDTO {
	@IsNumber()
	public readonly id: number;

	@IsNumber()
	@IsOptional()
	public readonly value?: number;

	@IsString()
	@IsOptional()
	public readonly date?: string;
}
