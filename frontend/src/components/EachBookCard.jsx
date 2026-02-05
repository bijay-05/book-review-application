import MyImage from "./MyImage";
import { Link } from "react-router-dom";

export default function EachBookCard({ imgSrc, bookTitle, author, bookId }) {
  console.log("Book Id in Each bOok card: ", bookId);
  return (
    <Link to={`/details/${bookId}`}>
      <div className="h-fit px-2 py-2 border-black w-[250px] shadow-xl cursor-pointer flex flex-col justify-between">
        <div>
          <MyImage src={imgSrc} />
          <div className="text-center">
            <span className="text-md font-bold line-clamp-2">
              Title: {bookTitle}
            </span>
          </div>
        </div>
        <div className="text-center">
          <span className="text-sm font-semibold">Author/s: {author}</span>
        </div>
      </div>
    </Link>
  );
}
