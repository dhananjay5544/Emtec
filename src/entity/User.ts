import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Book } from "./Book";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  user_id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field(() => Int)
  @Column("int")
  age: number;

  @ManyToMany(() => Book, (book: Book) => book.users)
  @JoinTable()
  books: Book[];
}
