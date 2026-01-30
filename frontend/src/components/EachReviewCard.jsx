import { Link } from "react-router-dom";

export default function EachReviewCard({ value, author, reviewId }) {
  return (
    <div className="h-fit w-full px-2 py-2 border-black shadow-xl">
      <div>
        <div>
          <span className="text-md font-bold line-clamp-2">{value}</span>
        </div>
        <div className="text-right bg-slate-">
          <span className="text-sm font-semibold font-mono text-indigo-800">
            - {author}
          </span>
        </div>
      </div>
    </div>
  );
}
