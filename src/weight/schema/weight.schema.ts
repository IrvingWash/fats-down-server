import {
	Prop,
	Schema,
	SchemaFactory,
} from "@nestjs/mongoose";

import mongoose from 'mongoose';

import { User } from '../../user/schema/user.schema';

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

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	})
	public user: User;
}

export type WeightDocument = Weight & mongoose.Document;
export const WeightSchema = SchemaFactory.createForClass(Weight);
