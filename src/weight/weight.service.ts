import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Weight, WeightDocument } from './schema/weight.schema';

@Injectable()
export class WeightService {
	public constructor(
		@InjectModel(Weight.name)
		private _weightModel: Model<WeightDocument>
	) {}
}
