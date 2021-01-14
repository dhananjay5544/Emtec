import { Request, Response } from "express";
import { Book } from "../../graphql/entity/Book";

// book by book_id
const getBook = async (req: Request, res: Response) => {
  const book = await Book.find({
    relations: ["users"],
    where: { book_id: req.params.id },
  });
  if (book.length === 0) {
    res.json({ msg: "Book not found!" });
  } else {
    res.json({ data: book });
  }
};

// all books
const getBooks = async (_: Request, res: Response) => {
  const books = await Book.find({ relations: ["users"] });
  res.json({ data: books });
};

// add new book
const addBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body).save();
    res.json({ msg: "Book added", book });
  } catch (error) {
    res.json({ msg: "Unable to add book", error });
  }
};

// update book
const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findOne({ where: { book_id: req.params.id } });
  if (!book) {
    res.json({ msg: "Book not found!" });
  } else {
    Object.assign(book, req.body);
    const updatedBook = await book.save();
    res.json({ msg: "Book updated", updatedBook });
  }
};

// delete book
const deleteBook = async (req: Request, res: Response) => {
  const book = await Book.find({
    where: { book_id: req.params.id },
  });
  if (book.length === 0) {
    res.json({ msg: "Book not found!" });
  } else {
    await Book.delete({ book_id: parseInt(req.params.id) });
    res.json({ data: "Book deleted" });
  }
};

export { getBook, getBooks, addBook, updateBook, deleteBook };
