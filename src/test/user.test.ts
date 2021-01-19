import { request } from "graphql-request";
import { url } from "./constants";

const addUserMutation = `
mutation{
  createUser(options:{firstname:"dhananjay",lastname:"shinde",email:"krish@gmail.com",age:20}){
    firstname
  }
}
`;

const updateUserMutation = `
mutation{
  updateUser(id: 2, input:{email:"shinde@gmail.com"})
}
`;

const deleteUserMutation = `
mutation {
  deleteUser(id: 4)
}
`;

test("Register new user", async () => {
  const response = await request(url, addUserMutation);
  expect(response).toEqual({ createUser: { firstname: "dhananjay" } });
});

test("Update user", async () => {
  const response = await request(url, updateUserMutation);
  if (response.updateUser === "user not found!") {
    expect(response).toEqual({ updateUser: "user not found!" });
  } else {
    expect(response).toEqual({ updateUser: "user updated!" });
  }
});

test("Delete user", async () => {
  const response = await request(url, deleteUserMutation);
  if (response.deleteUser === "user not found!") {
    expect(response).toEqual({ deleteUser: "user not found!" });
  } else {
    expect(response).toEqual({ deleteUser: "user deleted" });
  }
});
