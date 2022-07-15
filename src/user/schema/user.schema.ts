import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Weight } from '../../weight/schema/weight.schema';

@Schema()
export class User {
	@Prop({
		required: true,
		unique: true,
	})
	public name: string;

	@Prop({
		required: true,
	})
	public color: string;

	@Prop({
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Weight',
		}],
	})
	public weights: Weight[];
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
