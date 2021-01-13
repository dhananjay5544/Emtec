import { Router, Request, Response } from "express";
import controller from "../controller";

const router = Router();

// Base route
router.get("/", (_: Request, res: Response) => {
  res.send({
    msg: "Welcome to the rest api",
    requestedAt: new Date().toTimeString(),
  });
});

// book routes
router.get("/book/:id", controller.getBook);
router.get("/books", controller.getBooks);
router.post("/book", controller.addBook);
router.put("/book/:id", controller.updateBook);
router.delete("/book/:id", controller.deleteBook);

// user routes
router.get("/user/:id", controller.getUser);
router.get("/users", controller.getUsers);
router.post("/user", controller.addUser);
router.put("/user/:id", controller.updateUser);
router.delete("/user/:id", controller.deleteUser);

export default router;
