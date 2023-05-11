import {
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { User } from 'src/user/user.entity';

@Entity()
export class Weight {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public value: number;

	@Column()
	public date: string;

	@Exclude()
	@ManyToOne(() => User, (user) => user.weights)
	public user: User;
}
