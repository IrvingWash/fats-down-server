import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	Req,
	UseInterceptors,
} from '@nestjs/common';

import { Request } from 'express';

import { ITokenParser, TokenParser } from 'src/auth/token-parser';

import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
	private readonly _tokenParser: ITokenParser;

	public constructor(
		private readonly _userService: UserService
	) {
		this._tokenParser = new TokenParser();
	}

	@Get()
	public getAllUsers(
		@Req()
			request: Request
	): Promise<User[]> {
		const accessToken = this._tokenParser.getAccessToken(request);

		return this._userService.getAllUsers(accessToken);
	}
}
