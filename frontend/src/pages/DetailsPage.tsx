import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetail } from "../requests/fetchBooks";
import EachReviewCard from "../components/EachReviewCard";
import ReviewAddPopup from "../components/ReviewAddDialog";

export default function DetailsPage() {
  const { bookId } = useParams();
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const {
    data: bookDetail,
    isLoading: isBookLoading,
    isError: isBookError,
  } = fetchBookDetail(Number(bookId));

  // ?? -> checks only null and undefined values
  // || -> null, undefined and falsy values
  const reviewList = bookDetail?.reviews ?? [];

  // useEffect();
  // console.log("THis is book detail: ", bookDetail);

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
      <div className="px-4 py-4 md:px-8 md:py-8 bg-red-200 space-y-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-20 justify-center items-center md:items-start">
          <div className="flex items-center justify-center w-full md:w-auto">
            <img
              src={
                "https://anamikastorage.s3.ap-south-1.amazonaws.com/books/" +
                bookDetail?.images[0].name
              }
              alt={`Book: ${bookId}`}
              className="max-h-[300px] max-w-full md:max-w-[300px] object-contain"
            />
          </div>

          <div className="max-w-[400px] w-full flex flex-col gap-4 text-center md:text-left">
            <div>
              <span className="text-xl md:text-2xl font-semibold text-gray-700">
                {bookDetail.title}
              </span>
            </div>
            <div>
              <h1 className="font-bold text-3xl md:text-4xl">
                Title: {bookDetail.title}
              </h1>
            </div>
            <div className="text-base">
              <span className="font-semibold">Description:</span>
              <p className="text-gray-800 mt-1">{bookDetail.description}</p>
            </div>
            <div className="font-bold text-lg">
              Author/s : {(bookDetail.authors ?? []).join(", ")}
            </div>
            <div className="flex gap-4 justify-center md:justify-start items-center pt-2">
              <button
                className="px-6 py-2 border-2 border-black bg-green-300 rounded-md hover:bg-green-700 hover:text-white transition-colors duration-200"
                onClick={() => {
                  setShowReviewPopup(true);
                }}
              >
                Add Review
              </button>
            </div>
          </div>
        </div>

        <hr className="border-red-300" />

        <div className="p-4 md:p-6 bg-yellow-200 flex flex-col gap-4 rounded-xl shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold border-b border-yellow-400 pb-2">
            Reviews
          </h2>

          <div className="grid grid-cols-1 gap-2">
            {reviewList.map((review: any) => {
              return (
                <EachReviewCard
                  key={review.id}
                  value={review.value}
                  author={review.user.name}
                  reviewId={review.id}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ReviewAddPopup
        bookId={Number(bookId)}
        showPopup={showReviewPopup}
        setShowPopup={setShowReviewPopup}
      />
    </>
  );
}
