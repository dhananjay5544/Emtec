import { User } from "../entity/User";
import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class BookOutput {
  @Field(() => Int)
  book_id: number;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => [User])
  users?: User;
}

@InputType()
export class BookInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class BookUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  author?: string;

  @Field(() => Int, { nullable: true })
  quantity?: number;
}
