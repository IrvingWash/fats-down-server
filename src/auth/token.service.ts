import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import { EnvExtractor } from 'src/utils/env-extractor';

import {
	GenerateTokensPayload,
	TokenVerificationResult,
	Tokens,
} from './auth.objects';

@Injectable()
export class TokenService {
	private readonly _accessSecret: string;
	private readonly _refreshSecret: string;

	public constructor() {
		this._accessSecret = EnvExtractor.accessSecret;
		this._refreshSecret = EnvExtractor.refreshSecret;
	}

	public generateTokens(payload: GenerateTokensPayload): Tokens {
		const accessToken = sign(
			payload,
			this._accessSecret,
			{ expiresIn: '1h' }
		);

		const refreshToken = sign(
			payload,
			this._refreshSecret,
			{ expiresIn: '30d' }
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	public validateAccessToken(accessToken: string): TokenVerificationResult {
		try {
			// Throws if access token is invalid
			return verify(accessToken, this._accessSecret) as TokenVerificationResult;
		} catch {
			throw new UnauthorizedException();
		}
	}

	public validateRefreshToken(refreshToken: string): TokenVerificationResult {
		try {
			// Throws if refresh token is invalid
			return verify(refreshToken, this._refreshSecret) as TokenVerificationResult;
		} catch {
			throw new UnauthorizedException();
		}
	}
}
