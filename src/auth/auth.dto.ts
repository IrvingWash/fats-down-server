import {
	IsEmail,
	IsString,
	IsStrongPassword,
} from 'class-validator';

export class SignInDTO {
	@IsEmail()
	public readonly email: string;

	@IsStrongPassword()
	public readonly password: string;
}

export class SignUpDTO extends SignInDTO {
	@IsString()
	public readonly username: string;

	@IsString()
	public readonly color: string;
}
