import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StatusCode } from "../utils/StateStatusThunk";
import { fetchBookDetail } from "../requests/fetchBooks";
import { fetchReviews } from "../requests/fetchReviews";
import EachReviewCard from "../components/EachReviewCard";

export default function DetailsPage() {
  const { bookId } = useParams();

  const {
    data: bookDetail,
    isLoading: isBookLoading,
    isError: isBookError,
  } = fetchBookDetail(bookId);

  const {
    data: reviewList,
    isLoading: isReviewLoading,
    isError: isReviewError,
  } = fetchReviews();

  // useEffect();
  console.log("THis is book detail: ", bookDetail);

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
    <div className="px-8 py-4 bg-red-200 space-y-8">
      <div className="flex gap-52 justify-center">
        <div className="flex items-center">
          <img
            src={bookDetail?.imgSrc}
            alt={`Book: ${bookId}`}
            className="max-h-[300px] max-w-[300px] object-contain"
          />
        </div>
        <div className="max-w-[400px] flex flex-col gap-2">
          <div>
            <span className="text-2xl font-semibold">{bookDetail?.title}</span>
          </div>
          <div>
            <span className="font-bold text-4xl">
              Title: {bookDetail.title}
            </span>
          </div>
          <div className="text-l">
            <span className="font-semibold">Description:</span> <br />
            <span>{bookDetail?.description}</span>
          </div>
          <div className="text-center font-bold">
            <span>Author/s: {bookDetail.author}</span>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <div>
              <button
                className="px-2 py-1 border border-black"
                onClick={() => {
                  if (quantity <= 1) {
                    return;
                  }
                  setQuantity((prev) => prev - 1);
                }}
              >
                -
              </button>
              <span className="px-2">
                CategoryID:{" "}
                <span className="font-bold">{bookDetail.categoryId}</span>
              </span>
              <button
                className="px-2 py-1 border border-black"
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                }}
              >
                +
              </button>
            </div>
            <div>
              <button
                className="px-4 py-1 border-2 border-black rounded-md hover:bg-black hover:text-white"
                onClick={() => {
                  // dispatch(addToCart({ bookDetail, quantity }));
                  alert("Added to cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 min-h-full bg-yellow-200 flex flex-col justify-center">
        <div className="text-3xl">Reviews</div>
        <div className="border-2 ">
          {reviewList.data.map((review, idx) => {
            return (
              <EachReviewCard
                key={review.id}
                value={review.value}
                author={review.author}
                reviewId={review.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
