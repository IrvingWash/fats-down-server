import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
	public constructor(
		private readonly _userService: UserService
	) {}

	@Get()
	public getAllUsers(): Promise<User[]> {
		return this._userService.getAllUsers();
	}
}
