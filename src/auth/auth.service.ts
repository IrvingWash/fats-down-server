import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import { User } from 'src/user/user.entity';

import { TokenService } from './token.service';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { AuthResult, Tokens } from './auth.objects';

@Injectable()
export class AuthService {
	public constructor(
		@InjectRepository(User)
		private readonly _userRepository: Repository<User>,

		private readonly _tokenService: TokenService,
	) {}

	public async signIn(dto: SignInDTO): Promise<AuthResult> {
		const user = await this._userRepository.findOneBy({
			email: dto.email,
		});

		if (user === null) {
			throw new UnauthorizedException();
		}

		const isCorrectPassword = await compare(dto.password, user.password);

		if (!isCorrectPassword) {
			throw new UnauthorizedException();
		}

		const { username, email } = user;

		const tokens = this._tokenService.generateTokens({ username, email });

		user.refreshToken = tokens.refreshToken;

		await this._userRepository.save(user);

		return {
			email,
			username,
			tokens,
		};
	}

	public async signUp(dto: SignUpDTO): Promise<AuthResult> {
		const {
			email,
			username,
			password,
			color,
		} = dto;

		const hashedPassword = await hash(password, 5);

		const tokens = this._tokenService.generateTokens({ email, username });

		const user = this._userRepository.create({
			email,
			username,
			password: hashedPassword,
			color,
			refreshToken: tokens.refreshToken,
		});

		await this._userRepository.save(user);

		return {
			email,
			username,
			tokens,
		};
	}

	public async refresh(refreshToken: string): Promise<Tokens> {
		const validationResult = this._tokenService.validateRefreshToken(refreshToken);

		const user = await this._userRepository.findOneBy({
			email: validationResult.email,
		});

		if (user === null) {
			throw new UnauthorizedException();
		}

		const tokens = this._tokenService.generateTokens({
			email: user.email,
			username: user.username,
		});

		user.refreshToken = tokens.refreshToken;

		await this._userRepository.save(user);

		return tokens;
	}

	public async signOut(accessToken: string): Promise<void> {
		const validationResult = this._tokenService.validateAccessToken(accessToken);

		const user = await this._userRepository.findOneBy({
			email: validationResult.email,
		});

		if (user === null) {
			throw new UnauthorizedException();
		}

		user.refreshToken = undefined;

		await this._userRepository.save(user);
	}
}
