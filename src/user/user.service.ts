import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { todo } from 'src/utils/helpers';

import { User } from './user.entity';

@Injectable()
export class UserService {
	public constructor(
		@InjectRepository(User)
		private readonly _userEntity: Repository<User>
	) {}

	public async getAllUsers(): Promise<User[]> {
		todo();
	}
}
