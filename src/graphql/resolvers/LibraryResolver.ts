import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Library } from "../entity/Library";
import libraryService from "../../services";
import {
  ActionResponse,
  BookIssueInput,
  BookReturnInput,
} from "../types/librarytypes";

@Resolver()
export class LibraryResolver {
  // Mutation: issue book
  @Mutation(() => ActionResponse)
  async issueBook(
    @Arg("options", () => BookIssueInput) options: BookIssueInput
  ) {
    return await libraryService.issueBook(options);
  }

  // Mutation: return book
  @Mutation(() => ActionResponse)
  async returnBook(
    @Arg("options", () => BookReturnInput) options: BookReturnInput
  ) {
    return await libraryService.returnBook(options);
  }

  // Query: library books history
  @Query(() => [Library])
  async Library() {
    return Library.find();
  }
}
