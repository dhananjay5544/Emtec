import {
  addBook,
  getBook,
  getBooks,
  deleteBook,
  updateBook,
} from "./bookService";
import {
  addUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
} from "./userService";

import { issueBook, returnBook } from "./libraryService";

export default {
  addBook,
  getBook,
  getBooks,
  deleteBook,
  updateBook,
  addUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
  issueBook,
  returnBook,
};
