import { request } from "graphql-request";
import { url } from "./constants";

const addBookMutation = `
mutation {
    createBook(options: { title: "titanic", author: "admin", quantity: 20 }){
      title
    }
  }
  
`;

const updateBookMutation = `
mutation {
    updateBook(id: 5, input: { title: "changed" })
}  
`;

const deleteBookMutation = `
mutation {
    deleteBook(id: 4)
}  
`;

const issueBookMutation = `
mutation {
  issueBook(options: { userid: 1, bookid: 1}) {
    status
    msg
  }
}
`;

const returnBookMutation = `
mutation {
  returnBook(options: { userid: 1, bookid:1}) {
    status
    msg
  }
}
`;

test("Add new book", async () => {
  const response = await request(url, addBookMutation);
  expect(response).toEqual({ createBook: { title: "titanic" } });
});

test("Update book", async () => {
  const response = await request(url, updateBookMutation);
  if (response.updateBook === "Book not found!") {
    expect(response).toEqual({ updateBook: "Book not found!" });
  } else {
    expect(response).toEqual({ updateBook: "Book updated!" });
  }
});

test("Delete book", async () => {
  const response = await request(url, deleteBookMutation);
  if (response.deleteBook === "Book not found!") {
    expect(response).toEqual({ deleteBook: "Book not found!" });
  } else {
    expect(response).toEqual({ deleteBook: "Book deleted" });
  }
});

test("Issue book to user 1", async () => {
  const response = await request(url, issueBookMutation);
  if (response.issueBook.status === 404) {
    expect(response.issueBook.msg).toEqual("User not found");
  }
  if (response.issueBook.status === 200) {
    expect(response.issueBook.msg).toEqual("book has been issued to user 1");
  }
});

test("Return book from user 1", async () => {
  const response = await request(url, returnBookMutation);
  if (response.returnBook.status === 404) {
    expect(response.returnBook.msg).toEqual("User not found");
  }
  if (response.returnBook.status === 422) {
    expect(response.returnBook.msg).toEqual("book was not issued to user 1");
  }
  if (response.returnBook.status === 200) {
    expect(response.returnBook.msg).toEqual("book has been returned by user 1");
  }
});
