import { ensureDefined } from './helpers';

enum EnvVariable {
	Port = 'PORT',
	ClientURL = 'CLIENT_URL',

	AccessSecret = 'ACCESS_SECRET',
	RefreshSecret = 'REFRESH_SECRET',

	DBType = 'DB_TYPE',
	DBHost = 'DB_HOST',
	DBPort = 'DB_PORT',
	DBName = 'DB_NAME',
	DBUser = 'DB_USER',
	DBPassword = 'DB_PASSWORD',
	DBSynchronize = 'DB_SYNCHRONIZE',
}

type DBType = 'postgres' | 'mongodb';

export class EnvExtractor {
	public static get port(): number {
		return this._getNumber(EnvVariable.Port);
	}

	public static get clientURL(): string {
		return this._getVariable(EnvVariable.ClientURL);
	}

	public static get accessSecret(): string {
		return this._getVariable(EnvVariable.AccessSecret);
	}

	public static get refreshSecret(): string {
		return this._getVariable(EnvVariable.RefreshSecret);
	}

	public static get dbType(): DBType {
		return this._getVariable(EnvVariable.DBType) as DBType;
	}

	public static get dbHost(): string {
		return this._getVariable(EnvVariable.DBHost);
	}

	public static get dbPort(): number {
		return this._getNumber(EnvVariable.DBPort);
	}

	public static get dbName(): string {
		return this._getVariable(EnvVariable.DBName);
	}

	public static get dbUser(): string {
		return this._getVariable(EnvVariable.DBUser);
	}

	public static get dbPassword(): string {
		return this._getVariable(EnvVariable.DBPassword);
	}

	public static get dbSynchronize(): boolean {
		return this._getBoolean(EnvVariable.DBSynchronize);
	}

	private static _getVariable(name: EnvVariable): string {
		return ensureDefined(process.env[name], `Environment variable ${name} is not provided`);
	}

	private static _getNumber(name: EnvVariable): number {
		const value = +this._getVariable(name);

		if (isNaN(value)) {
			throw new Error(`Environment variable ${name} must be a number`);
		}

		return value;
	}

	private static _getBoolean(name: EnvVariable): boolean {
		const value = this._getVariable(name);

		return value === 'true';
	}
}
