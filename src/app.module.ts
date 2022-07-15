import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

import { WeightModule } from './weight/weight.module';

config();

const dbUrl = process.env.DB_URL;

@Module({
	imports: [
		MongooseModule.forRoot(dbUrl),
		WeightModule,
	],
})
export class AppModule {}
