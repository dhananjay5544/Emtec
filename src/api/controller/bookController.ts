import { Request, Response } from "express";
import { Book } from "../../graphql/entity/Book";

const getBook = async (req: Request, res: Response) => {
  const book = await Book.find({ where: { book_id: req.params.id } });
  res.json({ data: book });
};

const getBooks = async (_: Request, res: Response) => {
  const books = await Book.find();
  res.json({ data: books });
};

const addBook = (_: Request, res: Response) => {
  // TODO
  res.json({ msg: "on same page" });
};

const updateBook = (_: Request, res: Response) => {
  // TODO
  res.json({ msg: "on same page" });
};

const deleteBook = (_: Request, res: Response) => {
  // TODO
  res.json({ msg: "on same page" });
};

export { getBook, getBooks, addBook, updateBook, deleteBook };
