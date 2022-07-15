import {
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";

import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { User, UserDocument } from "../user/schema/user.schema";
import { WeightDto } from './dto/weight.dto';
import { Weight, WeightDocument } from './schema/weight.schema';

@Injectable()
export class WeightService {
	public constructor(
		@InjectModel(Weight.name)
		private _weightModel: Model<WeightDocument>,

		@InjectModel(User.name)
		private _userModel: Model<UserDocument>
	) {}

	public async create(dto: WeightDto): Promise<Weight> {
		try {
			const { userId, value, time } = dto;

			const user = await this._userModel.findById(userId);

			if (user === null) {
				throw new HttpException(
					'User not found',
					HttpStatus.BAD_REQUEST
				);
			}

			const newWeight = await this._weightModel.create({ value, time, user: user._id });

			user.weights.push(newWeight);

			await user.save();

			return newWeight;
		} catch (error) {
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	public async findAll(): Promise<Weight[]> {
		try {
			return await this._weightModel.find();
		} catch (error) {
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	public async delete(id: ObjectId): Promise<void> {
		try {
			await this._weightModel.findByIdAndDelete(id);
		} catch (error) {
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
