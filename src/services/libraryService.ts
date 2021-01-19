import { getManager } from "typeorm";
import {
  BookIssueInput,
  BookReturnInput,
} from "../graphql/types//librarytypes";
import { Book } from "../graphql/entity/Book";
import { User } from "../graphql/entity/User";
import { Library } from "../graphql/entity/Library";

// Issue book
const issueBook = async (options: BookIssueInput) => {
  // check user exists or not
  var user = await User.find({
    where: { user_id: options.userid },
    relations: ["books"],
  });
  var book = await Book.find({
    where: { book_id: options.bookid },
    relations: ["users"],
  });

  if (user.length !== 0) {
    // check book already issued
    const isIssued = await Library.find({
      where: {
        bookid: options.bookid,
        userid: options.userid,
        status: "issued",
      },
    });

    if (isIssued.length === 0) {
      await Library.create({ ...options, status: "issued" }).save();

      Object.assign(user[0], user[0].books.push(book[0]));
      user[0].save();

      // decreament book count
      const entityManager = getManager();
      await entityManager.decrement(
        Book,
        { book_id: options.bookid },
        "quantity",
        1
      );
      return {
        status: 200,
        msg: `book has been issued to user ${options.userid}`,
        reminder: "reminder has been set",
      };
    } else {
      return {
        status: 201,
        msg: `Book has been already issued to ${user[0].firstname}`,
      };
    }
  } else {
    return {
      status: 404,
      msg: `User not found`,
    };
  }
};

// return book
const returnBook = async (options: BookReturnInput) => {
  var user = await User.find({
    where: { user_id: options.userid },
    relations: ["books"],
  });

  const exists = await Library.count({
    where: {
      bookid: options.bookid,
      userid: options.userid,
      status: "issued",
    },
  });

  if (user.length !== 0) {
    if (exists) {
      await Library.update(
        { bookid: options.bookid, userid: options.userid },
        { status: "returned" }
      );

      user[0].books = user[0].books.filter((i) => i.book_id !== options.bookid);
      user[0].save();

      // increament book count
      const entityManager = getManager();
      await entityManager.increment(
        Book,
        { book_id: options.bookid },
        "quantity",
        1
      );
      return {
        status: 200,
        msg: `book has been returned by user ${options.userid}`,
      };
    } else {
      return {
        status: 422,
        msg: `book was not issued to user ${options.userid}`,
      };
    }
  } else {
    return {
      status: 404,
      msg: `User not found`,
    };
  }
};

export { issueBook, returnBook };
