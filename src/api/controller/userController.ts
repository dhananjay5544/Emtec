import { Request, Response } from "express";

const getUser = (_: Request, res: Response) => {
  console.log(res);
};

const getUsers = (_: Request, res: Response) => {
  console.log(res);
};

const addUser = (_: Request, res: Response) => {
  console.log(res);
};

const updateUser = (_: Request, res: Response) => {
  console.log(res);
};

const deleteUser = (_: Request, res: Response) => {
  console.log(res);
};

export { getUser, getUsers, addUser, updateUser, deleteUser };
