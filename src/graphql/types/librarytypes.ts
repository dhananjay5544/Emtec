import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class ActionResponse {
  @Field(() => Boolean)
  status: number;

  @Field()
  msg: string;

  @Field({ nullable: true })
  reminder?: string;
}

@InputType()
export class BookIssueInput {
  @Field(() => Int)
  userid: number;

  @Field(() => Int)
  bookid: number;
}

@InputType()
export class BookReturnInput {
  @Field(() => Int)
  userid: number;

  @Field(() => Int)
  bookid: number;
}
