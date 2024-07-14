import express from "express";
import {
  createBook,
  deletebook,
  getAllBooks,
  updatebook,
} from "../model/bookModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import { newBookValidation } from "../validationMiddleware/bookValidation.js";
import { adminAuth } from "../authMiddleware/authMiddleware.js";

const bookRouter = express.Router();

// Public Routes
// Get all books

bookRouter.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();

    books?.length
      ? buildSuccessResponse(res, books, "All Books")
      : buildErrorResponse(res, "No books Available");
  } catch (error) {
    buildErrorResponse(res, "No books Available");
  }
});

export default bookRouter;

// Private Route
// Create book

bookRouter.post("/", adminAuth, newBookValidation, async (req, res) => {
  try {
    const book = await createBook(req.body);
    book?._id
      ? buildSuccessResponse(res, book, "Book created Successfully")
      : buildErrorResponse(res, "Unable to create book");
  } catch (error) {
    if (error.code === 11000) {
      error.message =
        "There is another book that has similar ISBN. Plase change the isbn and try again";
    }
    buildErrorResponse(res, error.message);
  }
});

//Update book
bookRouter.patch("/", adminAuth, async (req, res) => {
  try {
    const updatedbook = req.body;
    const book = await updatebook(updatedbook);
    buildSuccessResponse(res, book, "Book updated successfully!!");
  } catch (error) {
    if (error.code === 11000) {
      error.message =
        "There is another book that has similar ISBN. Plase change the isbn and try again";
    }
    buildErrorResponse(res, error.message);
  }
});

// Delete book
bookRouter.delete("/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await deletebook(id);
    buildSuccessResponse(res, id, "Book deleted successfully!!");
  } catch (error) {
    buildErrorResponse(res, "Cannot delete book");
  }
});
