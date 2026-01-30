import EachReviewCard from "../components/EachReviewCard";
import { fetchReviewsByUser } from "../requests/fetchReviews";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const {
    data: reviewsByUser,
    isLoading: isReviewLoading,
    isError: isReviewError,
  } = fetchReviewsByUser();

  if (isReviewLoading) {
    return (
      <p className="min-h-[250px] py-4 text-center font-semibold text-xl">
        Loading...
      </p>
    );
  } else if (isReviewError) {
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
        <h1 className="text-3xl font-bold">Your Review Collection</h1>
        <button
          className="border-2 text-lg px-2 py-2 hover:bg-blue-400 hover:text-white font-bold"
          onClick={() => navigate("/profile")}
        >
          Book Collection
        </button>
      </div>
      <div className="min-h-screen px-8 py-4 ">
        {reviewsByUser?.data?.map((review, idx) => {
          return (
            <EachReviewCard
              key={review.id}
              value={review.value}
              author={review.author}
            />
          );
        })}
      </div>
    </>
  );
}
