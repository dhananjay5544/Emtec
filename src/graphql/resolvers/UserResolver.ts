import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { User } from "../entity/User";
import { UserInput, UserUpdateInput, UserOutput } from "../types/usertypes";
import userService from "../../services";

@Resolver()
export class UserResolver {
  // Mutation: create user
  @Mutation(() => User)
  async createUser(@Arg("options", () => UserInput) options: UserInput) {
    return await userService.addUser(options);
  }

  // Mutation: update user
  @Mutation(() => String)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => UserUpdateInput) input: UserUpdateInput
  ) {
    const res = await userService.updateUser(id, input);
    return res.msg;
  }

  // Mutation: delete user
  @Mutation(() => String)
  async deleteUser(@Arg("id", () => Int) id: number) {
    const res = await userService.deleteUser(id);
    return res.msg;
  }

  // Query: get all users
  @Query(() => [UserOutput])
  async Users() {
    const users = await userService.getUsers();
    return users;
  }
}
