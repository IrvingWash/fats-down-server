import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
	public constructor(
		private readonly _userService: UserService
	) {}

	@Get('all')
	public getAllUsers(): Promise<User[]> {
		return this._userService.getAllUsers();
	}
}
