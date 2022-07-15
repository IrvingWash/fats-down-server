import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	config();

	const port = process.env.PORT;

	const app = await NestFactory.create(AppModule);

	await app.listen(port);
}

bootstrap();
