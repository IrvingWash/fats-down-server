import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	config();

	const port = process.env.PORT;

	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: process.env.CLIENT_URL,
	});

	await app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
}

bootstrap();
