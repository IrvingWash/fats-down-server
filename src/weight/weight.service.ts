import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from 'src/user/user.service';

import { CreateWeightDTO, UpdateWeightDTO } from './weight.dto';
import { Weight } from './weight.entity';

@Injectable()
export class WeightService {
	public constructor(
		@InjectRepository(Weight)
		private readonly _weightRepository: Repository<Weight>,

		private readonly _userService: UserService
	) {}

	public async createWeight(dto: CreateWeightDTO, accessToken: string): Promise<Weight> {
		const user = await this._userService.getUser(accessToken);

		const weight = this._weightRepository.create({ ...dto, user });

		return await this._weightRepository.save(weight);
	}

	public async updateWeight(dto: UpdateWeightDTO, accessToken: string): Promise<Weight> {
		await this._userService.getUser(accessToken);

		return await this._weightRepository.save({ ...dto });
	}
}
