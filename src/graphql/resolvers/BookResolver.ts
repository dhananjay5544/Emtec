import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { Book } from "../entity/Book";
import { BookInput, BookUpdateInput, BookOutput } from "../types/booktypes";
import bookService from "../../services";

@Resolver()
export class BookResolver {
  // Mutation: add new book
  @Mutation(() => Book)
  async createBook(@Arg("options", () => BookInput) options: BookInput) {
    return await bookService.addBook(options);
  }

  // Mutation: update book
  @Mutation(() => String)
  async updateBook(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => BookUpdateInput) input: BookUpdateInput
  ) {
    const res = await bookService.updateBook(id, input);
    return res.msg;
  }

  // Mutation: delete book
  @Mutation(() => String)
  async deleteBook(@Arg("id", () => Int) id: number) {
    const res = await bookService.deleteBook(id);
    return res.msg;
  }

  // Query: get all books
  @Query(() => [BookOutput])
  async Books() {
    const books = await bookService.getBooks();
    return books;
  }
}
