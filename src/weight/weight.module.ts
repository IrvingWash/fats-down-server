import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenService } from 'src/auth/token.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

import { WeightController } from './weight.controller';
import { Weight } from './weight.entity';
import { WeightService } from './weight.service';

@Module({
	imports: [TypeOrmModule.forFeature([Weight, User])],
	controllers: [WeightController],
	providers: [WeightService, UserService, TokenService],
})
export class WeightModule {}
