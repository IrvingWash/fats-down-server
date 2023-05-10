import { ensureDefined } from './helpers';

enum EnvVariable {
	Port = 'PORT',
	ClientURL = 'CLIENT_URL',
}

export class EnvExtractor {
	public static get port(): number {
		const port = Number(this._getVariable(EnvVariable.Port));

		if (isNaN(port)) {
			throw new Error(`Environment variable ${EnvVariable.Port} must be a number`);
		}

		return port;
	}

	public static get clientURL(): string {
		return this._getVariable(EnvVariable.ClientURL);
	}

	private static _getVariable(name: EnvVariable): string {
		return ensureDefined(process.env[name], `Environment variable ${name} is not provided`);
	}
}
