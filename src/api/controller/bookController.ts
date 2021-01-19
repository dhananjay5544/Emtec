import { Request, Response } from "express";
import bookService from "../../services";

// book by book_id
const getBook = async (req: Request, res: Response) => {
  const result = await bookService.getBook(parseInt(req.params.id));
  res.status(result.status).json({ data: result.data });
};

// all books
const getBooks = async (_: Request, res: Response) => {
  const result = await bookService.getBooks();
  res.status(200).json({ data: result });
};

// add new book
const addBook = async (req: Request, res: Response) => {
  try {
    const result = await bookService.addBook(req.body);
    res.json({ msg: "Book added", result });
  } catch (error) {
    res.json({ msg: "Unable to add book", error });
  }
};

// update book
const updateBook = async (req: Request, res: Response) => {
  const result = await bookService.updateBook(
    parseInt(req.params.id),
    req.body
  );
  res.status(result.status).json({ data: result.msg });
};

// delete book
const deleteBook = async (req: Request, res: Response) => {
  const result = await bookService.deleteBook(parseInt(req.params.id));
  res.status(result.status).json({ data: result.msg });
};

// issue book
const issueBook = async (req: Request, res: Response) => {
  const result = await bookService.issueBook(req.body);
  res.status(result.status).json({ data: result });
};

// return book
const returnBook = async (req: Request, res: Response) => {
  const result = await bookService.returnBook(req.body);
  res.status(result.status).json({ data: result });
};

export {
  getBook,
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  issueBook,
  returnBook,
};
