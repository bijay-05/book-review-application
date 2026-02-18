import React from "react";
import { fetchCategory } from "../requests/fetchCategory";

interface ICategoryValues {
  categories: any;
  isCategoryLoading: boolean;
  isCategoryError: boolean;
}

const CategoryContext = React.createContext<ICategoryValues | null>(null);

export const useCategoryContext = () => {
  const context = React.useContext(CategoryContext);
  if (!context) {
    throw new Error("use context within provider");
  }

  return context;
};

export default function CategoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = fetchCategory();

  return (
    <CategoryContext.Provider
      value={{ categories, isCategoryLoading, isCategoryError }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
