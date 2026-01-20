import React, { useEffect } from "react";
import EachBookCard from "../components/EachBookCard";
import { StatusCode } from "../utils/StateStatusThunk";
import { fetchCategory } from "../requests/fetchCategory";
import { useCategoryStore } from "../store/store";
import { fetchBooks } from "../requests/fetchBooks";

export default function HomePage() {
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = fetchCategory();
  const {
    data: books,
    isLoading: isBookLoading,
    isError: isBookError,
  } = fetchBooks();

  console.log("Data from response: ", categories);

  const { setCategories } = useCategoryStore();

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategories(categories);
    }
  }, [categories]);

  if (isCategoryLoading) {
    return (
      <p className="min-h-[250px] py-4 text-center font-semibold text-xl">
        Loading...
      </p>
    );
  } else if (isCategoryError) {
    return (
      <div className="min-h-[250px] flex items-center bg-red-800">
        <p className="w-full py-4 text-center font-semibold text-xl text-white">
          <span className="text-6xl">😟</span> <br />
          <span>
            Something went wrong. <br /> Please try again!!!
          </span>
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen px-8 py-4 flex gap-4 flex-wrap justify-center">
        {books?.data?.map((book, idx) => {
          return (
            <EachBookCard
              key={book.id}
              bookId={book.id}
              imgSrc={book?.imgSrc}
              bookTitle={book.title}
              bookAuthor={book.author}
            />
          );
        })}
      </div>
    </>
  );
}
