import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { getManager } from "typeorm";
import { Library } from "../entity/Library";
import { Book } from "../entity/Book";
import {
  ActionResponse,
  BookIssueInput,
  BookReturnInput,
} from "../types/librarytypes";

import { User } from "../entity/User";

@Resolver()
export class LibraryResolver {
  // Mutation: issue book
  @Mutation(() => ActionResponse)
  async issueBook(
    @Arg("options", () => BookIssueInput) options: BookIssueInput
  ) {
    // check user exists or not
    const user = await User.find({ where: { user_id: options.userid } });

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
        const entityManager = getManager();
        await entityManager.query(
          `Insert into book_users_user values(${options.bookid},${options.userid})`
        );
        await entityManager.query(
          `Insert into user_books_book values(${options.userid},${options.bookid})`
        );
        await entityManager.decrement(
          Book,
          { book_id: options.bookid },
          "quantity",
          1
        );
        return {
          status: true,
          msg: `book has been issued to user ${options.userid}`,
          reminder: "reminder has been set",
        };
      } else {
        return {
          status: false,
          msg: `Book has been already issued to ${user[0].firstname}`,
        };
      }
    } else {
      return {
        status: false,
        msg: `User not found`,
      };
    }
  }

  // Mutation: return book
  @Mutation(() => ActionResponse)
  async returnBook(
    @Arg("options", () => BookReturnInput) options: BookReturnInput
  ) {
    const exists = await Library.count({
      where: {
        bookid: options.bookid,
        userId: options.userid,
        status: "issued",
      },
    });
    if (exists) {
      await Library.update(
        { bookid: options.bookid, userid: options.userid },
        { status: "returned" }
      );
      const entityManager = getManager();
      await entityManager.query(
        `Delete from book_users_user where userUserId=${options.userid} and bookBookId=${options.bookid}`
      );

      await entityManager.query(
        `Delete from user_books_book where userUserId=${options.userid} and bookBookId=${options.bookid}`
      );

      await entityManager.increment(
        Book,
        { book_id: options.bookid },
        "quantity",
        1
      );
      return {
        status: true,
        msg: `book has been returned by user ${options.userid}`,
      };
    } else {
      return {
        status: false,
        msg: `book was not issued to user ${options.userid}`,
      };
    }
  }

  // Query: library books history
  @Query(() => [Library])
  async Library() {
    return Library.find();
  }
}
