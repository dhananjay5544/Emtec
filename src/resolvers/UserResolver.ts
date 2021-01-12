import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { User } from "../entity/User";
import { UserInput, UserUpdateInput, UserOutput } from "../types/usertypes";

@Resolver()
export class UserResolver {
  // Mutation: create user
  @Mutation(() => User)
  async createUser(@Arg("options", () => UserInput) options: UserInput) {
    const user = await User.create(options).save();
    return user;
  }

  // Mutation: update user
  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => UserUpdateInput) input: UserUpdateInput
  ) {
    const user = await User.findOne({ where: { user_id: id } });
    if (!user) throw new Error("User not found!");
    Object.assign(user, input);
    await user.save();
    return true;
  }

  // Mutation: delete user
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number) {
    const user = await User.findOne({ where: { user_id: id } });
    if (!user) throw new Error("User not found!");
    await User.delete({ user_id: id });
    return true;
  }

  // Query: get all users
  @Query(() => [UserOutput])
  async Users() {
    const users = await User.find({ relations: ["books"] });
    return users;
  }
}
