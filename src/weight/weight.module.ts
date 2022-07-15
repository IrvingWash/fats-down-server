import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from "../user/schema/user.schema";
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
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	providers: [WeightService],
	controllers: [WeightController],
})
export class WeightModule {}
