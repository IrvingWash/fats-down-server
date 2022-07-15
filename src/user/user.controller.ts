import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
} from '@nestjs/common';

import { ObjectId } from 'mongoose';

import { UserDto } from './dto/user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	public constructor(
		private _userService: UserService
	) {}

	@Post()
	public async create(
		@Body()
		dto: UserDto
	): Promise<User> {
		return await this._userService.create(dto);
	}

	@Get()
	public async findAll(): Promise<User[]> {
		return await this._userService.findAll();
	}

	@Delete(':id')
	public async delete(
		@Param('id')
		id: ObjectId
	): Promise<void> {
		return await this._userService.delete(id);
	}
}
