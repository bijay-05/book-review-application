export default function EachReviewCard({
  value,
  author,
  reviewId,
  rating,
}: {
  value: string;
  author: string;
  reviewId: number;
  rating: number;
}) {
  return (
    <div className="h-fit w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-between gap-4">
      <p className="text-md font-bold line-clamp-3">{value}</p>
      <div className="text-right font-bold text-lg">
        Rating :{" "}
        <span
          className={
            rating > 0 ? "text-3xl text-yellow-400" : "text-3xl text-gray-500"
          }
        >
          {Array.from({ length: rating || 4 }, (_, idx) => "⭐")}
        </span>
      </div>
      <div className="text-right">
        <span className="text-sm font-semibold font-mono text-indigo-800">
          - {author}
        </span>
      </div>
    </div>
  );
}
