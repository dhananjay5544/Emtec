import { Resolver, Mutation, Arg, Int, Query } from "type-graphql";
import { Book } from "../entity/Book";
import { BookInput, BookUpdateInput, BookOutput } from "../types/booktypes";

@Resolver()
export class BookResolver {
  // Mutation: insert book
  @Mutation(() => Book)
  async createBook(@Arg("options", () => BookInput) options: BookInput) {
    const book = await Book.create(options).save();
    return book;
  }

  // Mutation: update book
  @Mutation(() => Boolean)
  async updateBook(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => BookUpdateInput) input: BookUpdateInput
  ) {
    const book = await Book.findOne({ where: { book_id: id } });
    if (!book) throw new Error("Book not found!");
    Object.assign(book, input);
    await book.save();
    return true;
  }

  // Mutation: delete book
  @Mutation(() => Boolean)
  async deleteBook(@Arg("id", () => Int) id: number) {
    const book = await Book.findOne({ where: { book_id: id } });
    if (!book) throw new Error("Book not found!");
    await Book.delete({ book_id: id });
    return true;
  }

  // Query: get all books
  @Query(() => [BookOutput])
  async Books() {
    const books = await Book.find({ relations: ["users"] });
    return books;
  }
}
