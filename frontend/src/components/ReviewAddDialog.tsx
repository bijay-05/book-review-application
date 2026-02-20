import { useState, type FormEvent } from "react";
import { addNewReview } from "../requests/addReview";
import { useQueryClient } from "@tanstack/react-query";

interface IReviewAddPopupProps {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: number | null;
}

interface IReview {
  value: string;
  bookId: number | null;
}

const ReviewAddPopup = ({
  showPopup,
  setShowPopup,
  bookId,
}: IReviewAddPopupProps) => {
  const [newReview, setNewReview] = useState<IReview>({
    value: "",
    bookId: bookId,
  });
  const queryClient = useQueryClient();

  const handleAddReview = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addNewReview(newReview);
      queryClient.invalidateQueries({
        queryKey: ["bookDetail"],
      });

      setShowPopup(false);
      setNewReview({
        bookId: null,
        value: "",
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return showPopup ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add Review</h2>
        <form onSubmit={handleAddReview}>
          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-bold mb-2">
              Review:
            </label>
            <textarea
              rows={5}
              cols={50}
              id="review"
              value={newReview.value}
              onChange={(e) =>
                setNewReview((prev) => ({ ...prev, value: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-sm"
          >
            Add Review
          </button>
          <button
            onClick={() => setShowPopup(false)}
            className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ReviewAddPopup;
