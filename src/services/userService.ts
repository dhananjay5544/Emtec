import { UserInput, UserUpdateInput } from "../graphql/types/usertypes";
import { User } from "..//graphql/entity/User";

const getUser = async (id: number) => {
  const user = await User.find({
    relations: ["books"],
    where: { user_id: id },
  });
  if (user.length === 0) {
    return { status: 404, data: "user not found!" };
  } else {
    return { status: 200, data: user };
  }
};

const getUsers = async () => {
  const users = await User.find({ relations: ["books"] });
  return users;
};

const addUser = async (newUser: UserInput) => {
  const user = await User.create(newUser).save();
  return user;
};

const updateUser = async (id: number, updateData: UserUpdateInput) => {
  const user = await User.findOne({ where: { user_id: id } });
  if (!user) {
    return { status: 404, msg: "user not found!" };
  } else {
    Object.assign(user, updateData);
    await user.save();
    return { status: 200, msg: "user updated!" };
  }
};

const deleteUser = async (id: number) => {
  const user = await User.find({
    where: { user_id: id },
  });
  if (user.length === 0) {
    return { status: 404, msg: "user not found!" };
  } else {
    await User.delete({ user_id: id });
    return { status: 200, msg: "user deleted" };
  }
};

export { getUser, getUsers, addUser, updateUser, deleteUser };
