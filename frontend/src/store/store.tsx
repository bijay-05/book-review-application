import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  categories: [],
  setCategories: (newCategories: any[]) =>
    set(() => ({ categories: [...newCategories] })),
}));

export const useBookStore = create((set) => ({
  books: [],
  setBooks: (newBooks: any[]) => set(() => ({ books: [...newBooks] })),
}));

export const useUserBookStore = create((set) => ({
  userAddedBooks: [],
  setUserBooks: (userBooks: any[]) =>
    set(() => ({ userAddedBooks: [...userBooks] })),
}));
