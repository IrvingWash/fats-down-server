import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export interface ITokenParser {
	getAccessToken(request: Request): string;
	getRefreshToken(request: Request): string;
}

export class TokenParser implements ITokenParser {
	public getAccessToken(request: Request): string {
		const accessToken = request.headers.authorization?.split(' ')[1];

		if (accessToken === undefined) {
			throw new UnauthorizedException();
		}

		return accessToken;
	}

	public getRefreshToken(request: Request): string {
		const refreshToken = request.cookies?.refreshToken as string | undefined;

		if (refreshToken === undefined) {
			throw new UnauthorizedException();
		}

		return refreshToken;
	}
}
