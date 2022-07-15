import { Module } from "@nestjs/common";

import { WeightController } from "./weight.controller";
import { WeightService } from "./weight.service";

@Module({
	imports: [],
	providers: [WeightService],
	controllers: [WeightController],
})
export class WeightModule {}
