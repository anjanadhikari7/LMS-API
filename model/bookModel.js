// Get all books which are available

import bookSchema from "../schema/bookSchema.js";

export const getAllBooks = () => {
  return bookSchema.find();
};

// Create book

export const createBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

// Delete book

export const deletebook = (id) => {
  return bookSchema.findByIdAndDelete(id);
};

// update bok

export const updatebook = (updatedbook) => {
  const { id } = updatedbook;
  return bookSchema.findByIdAndUpdate(id, updatedbook);
};
