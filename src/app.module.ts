import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseConfiguration } from './database/database-configuration';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			useClass: DatabaseConfiguration,
		}),
		AuthModule,
		UserModule,
	],
})
export class AppModule {}
