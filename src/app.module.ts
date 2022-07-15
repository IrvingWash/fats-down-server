import { Module } from '@nestjs/common';

import { WeightModule } from './weight/weight.module';

@Module({
	imports: [WeightModule],
})
export class AppModule {}
