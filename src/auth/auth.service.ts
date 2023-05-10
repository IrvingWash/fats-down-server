import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/user.entity';
import { todo } from 'src/utils/helpers';

@Injectable()
export class AuthService {
	public constructor(
		@InjectRepository(User)
		private readonly _userEntity: Repository<User>
	) {}

	public async signIn(): Promise<unknown> {
		todo();
	}

	public async signUp(): Promise<unknown> {
		todo();
	}

	public async refresh(): Promise<unknown> {
		todo();
	}

	public async signOut(): Promise<unknown> {
		todo();
	}
}
