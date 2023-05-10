import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
	public constructor(
		@InjectRepository(User)
		private readonly _userRepository: Repository<User>
	) {}

	public async getAllUsers(): Promise<User[]> {
		return this._userRepository.find();
	}
}
