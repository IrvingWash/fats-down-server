import {
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
	public constructor(
		@InjectModel(User.name)
		private _userModel: Model<UserDocument>
	) {}

	public async create(dto: UserDto): Promise<User> {
		try {
			return await this._userModel.create({ ...dto });
		} catch (error) {
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	public async findAll(): Promise<User[]> {
		try {
			return await this._userModel.find();
		} catch (error) {
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	public async delete(id: ObjectId): Promise<void> {
		try {
			await this._userModel.findByIdAndDelete(id);
		} catch {
			throw new HttpException(
				'Internal server error',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
