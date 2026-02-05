import EachBookCard from "../components/EachBookCard";
import { fetchBooks } from "../requests/fetchBooks";

export default function HomePage() {
  const {
    data: books,
    isLoading: isBookLoading,
    isError: isBookError,
  } = fetchBooks();
  console.log("These are the fetched books: ", books);

  if (isBookLoading) {
    return (
      <p className="min-h-[250px] py-4 text-center font-semibold text-xl">
        Loading...
      </p>
    );
  } else if (isBookError) {
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
              bookId={Number(book.id)}
              imgSrc="https://anamikastorage.s3.ap-south-1.amazonaws.com/books/abcd-17693-efgh.png" //{book?.imgSrc}
              bookTitle={book.title}
              author={book.authors}
            />
          );
        })}
      </div>
    </>
  );
}
