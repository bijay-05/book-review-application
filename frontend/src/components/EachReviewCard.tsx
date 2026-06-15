export default function EachReviewCard({
  value,
  author,
  reviewId,
}: {
  value: string;
  author: string;
  reviewId: number;
}) {
  return (
    <div className="h-fit w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-between gap-4">
      <p className="text-md font-bold line-clamp-3">{value}</p>
      <div className="text-right">
        <span className="text-sm font-semibold font-mono text-indigo-800">
          - {author}
        </span>
      </div>
    </div>
  );
}
