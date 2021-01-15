import { Request, Response } from "express";
import userService from "../../services";

const getUser = async (req: Request, res: Response) => {
  const result = await userService.getUser(parseInt(req.params.id));
  res.status(result.status).json({ data: result.data });
};

const getUsers = async (_: Request, res: Response) => {
  const result = await userService.getUsers();
  res.status(200).json({ data: result });
};

const addUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.addUser(req.body);
    res.json({ msg: "User added", result });
  } catch (error) {
    res.json({ msg: "Unable to add user", error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const result = await userService.updateUser(
    parseInt(req.params.id),
    req.body
  );
  res.status(result.status).json({ data: result.msg });
};

const deleteUser = async (req: Request, res: Response) => {
  const result = await userService.deleteUser(parseInt(req.params.id));
  res.status(result.status).json({ data: result.msg });
};

export { getUser, getUsers, addUser, updateUser, deleteUser };
