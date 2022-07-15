import { Controller } from "@nestjs/common";
import { WeightService } from "./weight.service";

@Controller('weights')
export class WeightController {
	public constructor(
		private _weightService: WeightService
	) {}
}
