import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as parseCookies from 'cookie-parser';

import { EnvExtractor } from './utils/env-extractor';
import { AppModule } from './app.module';

export class AppConfiguration {
	private _app!: INestApplication;
	private _logger: Logger;

	private _port: number;
	private _clientURL: string;

	public constructor() {
		this._logger = new Logger(AppConfiguration.name);

		this._port = EnvExtractor.port;
		this._clientURL = EnvExtractor.clientURL;
	}

	public async bootstrap(): Promise<void> {
		this._app = await NestFactory.create(AppModule);

		this._configure();

		await this._app.listen(
			this._port,
			() => this._logger.log(`Server started on port ${this._port}`)
		);
	}

	private _configure(): void {
		this._app.enableCors({
			origin: this._clientURL,
		});

		this._app.use(parseCookies());

		this._app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				transform: true,
			})
		);
	}
}
