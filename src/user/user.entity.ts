import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { Weight } from 'src/weight/weight.entity';

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
	public refreshToken?: string;

	@OneToMany(() => Weight, (weight) => weight.user)
	public weights: Weight[];
}
