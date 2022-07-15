import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { Weight, WeightSchema } from './schema/weight.schema';
import { WeightController } from "./weight.controller";
import { WeightService } from "./weight.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Weight.name,
				schema: WeightSchema,
			},
		]),
	],
	providers: [WeightService],
	controllers: [WeightController],
})
export class WeightModule {}
