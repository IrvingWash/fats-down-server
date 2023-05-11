import { Module } from '@nestjs/common';

import { UserService } from 'src/user/user.service';

import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';

@Module({
	controllers: [WeightController],
	providers: [WeightService, UserService],
})
export class WeightModule {}
