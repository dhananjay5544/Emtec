import { BookInput, BookUpdateInput } from "../graphql/types/booktypes";
import { Book } from "../graphql/entity/Book";

// book by book_id
const getBook = async (id: number) => {
  const book = await Book.find({
    relations: ["users"],
    where: { book_id: id },
  });
  if (book.length === 0) {
    return { status: 404, data: "Book not found!" };
  } else {
    return { status: 200, data: book };
  }
};

// all books
const getBooks = async () => {
  const books = await Book.find({ relations: ["users"] });
  return books;
};

// add new book
const addBook = async (newBook: BookInput) => {
  const book = await Book.create(newBook).save();
  return book;
};

// update book
const updateBook = async (id: number, updateData: BookUpdateInput) => {
  const book = await Book.findOne({ where: { book_id: id } });
  if (!book) {
    return { status: 404, msg: "Book not found!" };
  } else {
    Object.assign(book, updateData);
    await book.save();
    return { status: 200, msg: "Book updated!" };
  }
};

// delete book
const deleteBook = async (id: number) => {
  const book = await Book.find({
    where: { book_id: id },
  });
  if (book.length === 0) {
    return { status: 404, msg: "Book not found!" };
  } else {
    await Book.delete({ book_id: id });
    return { status: 200, msg: "Book deleted" };
  }
};

export { getBook, getBooks, addBook, updateBook, deleteBook };
