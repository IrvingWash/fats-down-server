import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { TokenService } from 'src/auth/token.service';

@Injectable()
export class UserService {
	public constructor(
		@InjectRepository(User)
		private readonly _userRepository: Repository<User>,

		private readonly _tokenService: TokenService
	) {}

	public async getAllUsers(): Promise<User[]> {
		return await this._userRepository.find({
			relations: { weights: true },
		});
	}

	public async getUser(accessToken: string): Promise<User> {
		const validationResult = this._tokenService.validateAccessToken(accessToken);

		const user = await this._userRepository.findOneBy({
			username: validationResult.username,
		});

		if (user === null) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
