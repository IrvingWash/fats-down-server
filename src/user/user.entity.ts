import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public username: string;

	@Column({ unique: true })
	public email: string;

	@Exclude()
	@Column()
	public password: string;

	@Column()
	public color: string;

	@Exclude()
	@Column({ nullable: true })
	public refreshToken: string;
}
