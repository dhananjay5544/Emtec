import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Library extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => Int)
	@Column()
	bookid: number;

	@Field(() => Int)
	@Column()
	userid: number;

	@Field()
	@Column()
	status: string;

	@Field(() => Date)
	@CreateDateColumn({ name: "created_at" })
	created_at!: Date;

	@Field(() => Date)
	@UpdateDateColumn({ name: "updated_at" })
	updated_at!: Date;
}
