import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { EnvExtractor } from 'src/utils/env-extractor';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: EnvExtractor.dbType,
			host: EnvExtractor.dbHost,
			port: EnvExtractor.dbPort,
			database: EnvExtractor.dbName,
			username: EnvExtractor.dbUser,
			password: EnvExtractor.dbPassword,
			entities: [],
			synchronize: EnvExtractor.dbSynchronize,
		};
	}
}
