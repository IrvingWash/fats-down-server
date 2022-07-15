import { ObjectId } from 'mongoose';

export class WeightDto {
	public readonly userId: ObjectId;

	public readonly value: number;

	public readonly time: {
		day: number;
		month: number;
		year: number;
	};
}
