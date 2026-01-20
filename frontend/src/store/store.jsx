import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  categories: [],
  setCategories: (newCategories) =>
    set(() => ({ categories: [...newCategories] })),
}));

export const useBookStore = create((set) => ({
  books: [],
  setBooks: (newBooks) => set(() => ({ books: [...newBooks] })),
}));
