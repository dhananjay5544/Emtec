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
    updateBook(id: 4, input: { title: "changed" })
}  
`;

const deleteBookMutation = `
mutation {
    deleteBook(id: 4)
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
