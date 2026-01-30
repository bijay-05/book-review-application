import EachBookCard from "../components/EachBookCard";
import { fetchUserBooks } from "../requests/fetchBooks";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const {
    data: books,
    isLoading: isBookLoading,
    isError: isBookError,
  } = fetchUserBooks();

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
      <div className="px-8 py-4 flex flex-col md:flex-row gap-4 justify-between">
        <h1 className="text-3xl font-bold">Your Book Collection</h1>
        <button
          className="border-2 text-lg font-bold px-2 py-2 hover:bg-blue-400 hover:text-white"
          onClick={() => navigate("/profile/reviews")}
        >
          Your Review Collection
        </button>
      </div>
      <div className="min-h-screen px-8 py-4 flex gap-4 flex-wrap justify-center">
        {books?.data?.map((book, idx) => {
          return (
            <EachBookCard
              key={book.id}
              imgSrc="https://anamikastorage.s3.ap-south-1.amazonaws.com/books/abcd-17693-efgh.png"
              bookTitle={book.title}
              author={book.author}
            />
          );
        })}
      </div>
    </>
  );
}
