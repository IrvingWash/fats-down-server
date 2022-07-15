import {
	Prop,
	Schema,
	SchemaFactory,
} from "@nestjs/mongoose";

import mongoose from 'mongoose';

@Schema()
export class Weight {
	@Prop({ required: true })
	public value: number;

	@Prop({
		required: true,
		type: {
			day: Number,
			month: Number,
			year: Number,
		},
	})
	public time: {
		day: number;
		month: number;
		year: number;
	};
}

export type WeightDocument = Weight & mongoose.Document;
export const WeightSchema = SchemaFactory.createForClass(Weight);
