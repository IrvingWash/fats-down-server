import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Patch,
	Post,
	Req,
	UseInterceptors,
} from '@nestjs/common';

import { Request } from 'express';

import { ITokenParser, TokenParser } from 'src/auth/token-parser';
import { CreateWeightDTO, UpdateWeightDTO } from './weight.dto';
import { Weight } from './weight.entity';

import { WeightService } from './weight.service';

@Controller('weight')
@UseInterceptors(ClassSerializerInterceptor)
export class WeightController {
	private readonly _tokenParser: ITokenParser;

	public constructor(
		private readonly _weightService: WeightService
	) {
		this._tokenParser = new TokenParser();
	}

	@Post()
	public async createWeight(
		@Req()
			request: Request,

		@Body()
			dto: CreateWeightDTO
	): Promise<Weight> {
		return await this._weightService.createWeight(
			dto,
			this._tokenParser.getAccessToken(request)
		);
	}

	@Patch()
	public async updateWeight(
		@Req()
			request: Request,

		@Body()
			dto: UpdateWeightDTO
	): Promise<Weight> {
		return await this._weightService.updateWeight(
			dto,
			this._tokenParser.getAccessToken(request)
		);
	}
}
