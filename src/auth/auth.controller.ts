import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthResult, Tokens } from './auth.objects';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { ITokenParser } from './token-parser';
import { TokenParser } from './token-parser';

@Controller('auth')
export class AuthController {
	private readonly _thirtyDays = 30 * 24 * 60 * 60 * 1000;
	private readonly _refreshTokenKey = 'refreshToken';

	private readonly _tokenParser: ITokenParser;

	public constructor(
		private readonly _authService: AuthService
	) {
		this._tokenParser = new TokenParser();
	}

	@Post('sign-in')
	@HttpCode(HttpStatus.OK)
	public async signIn(
		@Body()
			dto: SignInDTO,
		@Res({ passthrough: true })
			response: Response
	): Promise<AuthResult> {
		const signInResult = await this._authService.signIn(dto);

		this._sendCookies(response, signInResult.tokens.refreshToken);

		return signInResult;
	}

	@Post('sign-up')
	public async signUp(
		@Body()
			dto: SignUpDTO,
		@Res({ passthrough: true })
			response: Response
	): Promise<AuthResult> {
		const signUpResult = await this._authService.signUp(dto);

		this._sendCookies(response, signUpResult.tokens.refreshToken);

		return signUpResult;
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	public async refresh(
		@Req()
			request: Request,
		@Res({ passthrough: true })
			response: Response
	): Promise<Tokens> {
		const refreshToken = this._tokenParser.getRefreshToken(request);

		const refreshResult = await this._authService.refresh(refreshToken);

		this._sendCookies(response, refreshResult.refreshToken);

		return refreshResult;
	}

	@Post('sign-out')
	@HttpCode(HttpStatus.OK)
	public async signOut(
		@Req()
			request: Request,
		@Res({ passthrough: true })
			response: Response
	): Promise<void> {
		const accessToken = this._tokenParser.getAccessToken(request);

		await this._authService.signOut(accessToken);

		this._clearRefreshTokenCookie(response);
	}

	private _clearRefreshTokenCookie(response: Response): void {
		response.cookie(this._refreshTokenKey, '');
	}

	private _sendCookies(response: Response, refreshToken: string): void {
		response.cookie(
			this._refreshTokenKey,
			refreshToken,
			{
				maxAge: this._thirtyDays,
				httpOnly: true,
			}
		);
	}
}
