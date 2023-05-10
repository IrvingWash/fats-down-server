import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly _authService: AuthService
	) {}

	@Post('sign-in')
	@HttpCode(HttpStatus.OK)
	public signIn(): Promise<unknown> {
		return this._authService.signIn();
	}

	@Post('sign-up')
	public signUp(): Promise<unknown> {
		return this._authService.signUp();
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	public refresh(): Promise<unknown> {
		return this._authService.refresh();
	}

	@Post('sign-out')
	@HttpCode(HttpStatus.OK)
	public signOut(): Promise<unknown> {
		return this._authService.signOut();
	}
}
