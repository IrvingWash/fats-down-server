import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
} from "@nestjs/common";

import { ObjectId } from "mongoose";

import { WeightDto } from "./dto/weight.dto";
import { Weight } from "./schema/weight.schema";
import { WeightService } from "./weight.service";

@Controller('weights')
export class WeightController {
	public constructor(
		private _weightService: WeightService
	) {}

	@Post()
	public async create(
		@Body()
		dto: WeightDto
	): Promise<Weight> {
		return await this._weightService.create(dto);
	}

	@Get()
	public async findAll(): Promise<Weight[]> {
		return await this._weightService.findAll();
	}

	@Delete(':id')
	public async delete(
		@Param('id')
		id: ObjectId
	): Promise<void> {
		return await this._weightService.delete(id);
	}
}
