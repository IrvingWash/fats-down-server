import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { User } from 'src/user/user.entity';
import { EnvExtractor } from 'src/utils/env-extractor';
import { Weight } from 'src/weight/weight.entity';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: EnvExtractor.dbType,
			host: EnvExtractor.dbHost,
			port: EnvExtractor.dbPort,
			database: EnvExtractor.dbName,
			username: EnvExtractor.dbUser,
			password: EnvExtractor.dbPassword,
			entities: [User, Weight],
			synchronize: EnvExtractor.dbSynchronize,
		};
	}
}
