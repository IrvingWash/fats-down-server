import { ObjectId } from 'mongoose';

export class WeightDto {
	public readonly id: ObjectId;

	public readonly value: number;

	public readonly time: {
		day: number;
		month: number;
		year: number;
	};
}
